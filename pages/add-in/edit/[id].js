import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { getAddIn } from "../../../src/graphql/queries";
import { updateAddIn } from "../../../src/graphql/mutations";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import Link from "next/link";

const EditItem = () => {
  const router = useRouter();

  const [addIn, setAddIn] = useState();

  const addInId = router.query.id;

  useEffect(() => {
    getItemToEdit();
  }, [addInId]);

  const getItemToEdit = async () => {
    const {
      data: addInData,
      loading: addInLoading,
      error: addInError,
    } = await API.graphql({query: getAddIn, variables: { id: addInId }, authMode: "API_KEY"});
    setAddIn(addInData.getAddIn);
  };

  console.log(getItemToEdit)

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl text-gray-800 text-center">Edit Item</h1>
        </div>
        <div className="">
          <Formik
            initialValues={{
              name: (addIn && addIn.name) || "",

              description: (addIn && addIn.description) || "",
              isAvailable: (addIn && addIn.isAvailable) || "",
            }}
            enableReinitialize
            onSubmit={async (values, actions) => {
              await API.graphql(
                {query: updateAddIn, variables: {
                  input: {
                    name: values.name,

                    description: values.description,
                    isAvailable: values.isAvailable,
                    id: addInId,
                  },
                }, authMode: "API_KEY"}
              );
              fetch(
                "https://api.vercel.com/v1/integrations/deploy/QmY58qnSQ83vP7HrtRXVbWkKn1HjcJ9XLRsKkSko54jsqV/FkR9L18skN"
              )
                .then((res) => res.json())
                .then((data) => data);
              router.back();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="w-1/2 mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-gray-900 w-1/4" htmlFor="name">
                      Name
                    </label>
                    <Field
                      className="form-input w-full"
                      name="name"
                      placeholder="Item Name"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <label className="text-gray-900 w-1/4" name="description">
                      Description
                    </label>
                    <Field
                      className="form-input w-full"
                      name="description"
                      as="textarea"
                    />
                  </div>
                  <div
                    className="flex justify-between md:w-8/12 w-full py-2"
                    id="exact-change-group"
                  >
                    Is Available?
                    <div
                      className="flex justify-around items-center w-full"
                      role="group"
                      aria-labelledby="exact-change-group"
                    >
                      <div className="">
                        <label className="mr-2">Yes</label>
                        <Field
                          className="form-radio"
                          name="isAvailable"
                          type="radio"
                          value="True"
                        />
                      </div>
                      <div>
                        <label className="mr-2">No</label>
                        <Field
                          className="form-radio"
                          name="isAvailable"
                          type="radio"
                          value="false"
                        />
                      </div>
                      {/* {errors.isAvailable && touched.isAvailable ? (
                        <div className="text-red-700 ml-4">
                          {errors.isAvailable}
                        </div>
                      ) : null} */}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="btn-submit mr-2 "
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                    <button className="btn-delete ml-2">
                      <Link href="/add-in/create">
                        <a>Cancel</a>
                      </Link>
                    </button>
                  </div>
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

export default EditItem;
