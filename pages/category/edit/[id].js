import { API, graphqlOperation } from "aws-amplify";
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
      graphqlOperation(getCategory, { id: categoryId })
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

export default EditCategory;
