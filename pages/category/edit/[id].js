import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { updateCategory } from "../../../src/graphql/mutations";
import { listCategorys, getCategory } from "../../../src/graphql/queries";
import { Formik, Form, Field } from "formik";
import Layout from "../../../components/layout";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const EditCategory = () => {
  const [category, setCategory] = useState();
  const router = useRouter();
  const categoryId = router.query.id;

  const getCategoryToEdit = async (categoryId) => {
    const { data, loading, error } = await API.graphql(
      {query: getCategory, variables: { id: categoryId }, authMode: "API_KEY"}
    );

    if (data) {
      setCategory(data.getCategory);
    }
  };

  console.log(category);

  useEffect(() => {
    getCategoryToEdit(categoryId);
  }, []);

  return (
    <Layout>
      <div className="text-gray-900">
        <div className="w-1/2 mx-auto">
          <h1 className="text-center text-3xl">Edit Category</h1>
        </div>
        <div className="m-8">
          <Formik
            enableReinitialize
            initialValues={{
              name: category ? category.name : "",
            }}
            onSubmit={async (values) => {
              const newCategory = await API.graphql(
                graphqlOperation(updateCategory, {
                  input: { name: values.name, id: categoryId },
                })
              );
              router.back();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="flex justify-between items-center">
                  <label htmlFor="name">Category Name</label>
                  <Field
                    className="form-input w-10/12"
                    name="name"
                    placeholder="Name of Category"
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <button className="btn-submit" type="submit">
                    Submit
                  </button>
                  <button className="btn-delete ml-2">
                    <Link href="/category/create">
                      <a>Cancel</a>
                    </Link>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const ssr = withSSRContext(context);
  try {
    let isManager = false;
    let isStaff = false;
    const { signInUserSession } = await ssr.Auth.currentAuthenticatedUser();
    isManager = signInUserSession.accessToken.payload[
      "cognito:groups"
    ].includes("Managers");

    isStaff = signInUserSession.accessToken.payload["cognito:groups"].includes(
      "Staff"
    );
    if (isManager || isStaff) {
      return {
        props: {
          authenticated: true,
          isManager,
          isStaff,
        },
      };
    } else {
      context.res.writeHead(302, { location: "/" });
      context.res.end();
      return {
        props: {},
      };
    }
  } catch (err) {
    context.res.writeHead(302, { location: "/" });
    context.res.end();
    return {
      props: {},
    };
  }
}

export default EditCategory;
