import { API, graphqlOperation, JS } from "aws-amplify";
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
    } = await API.graphql(graphqlOperation(getAddIn, { id: addInId }));
    setAddIn(addInData.getAddIn);
  };

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
            }}
            enableReinitialize
            onSubmit={async (values, actions) => {
              await API.graphql(
                graphqlOperation(updateAddIn, {
                  input: {
                    name: values.name,

                    description: values.description,

                    id: addInId,
                  },
                })
              );

              router.back();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="w-1/2 mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-gray-900" htmlFor="name">
                      Name
                    </label>
                    <Field
                      className="form-input"
                      name="name"
                      placeholder="Item Name"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <label className="text-gray-900" name="description">
                      Description
                    </label>
                    <Field
                      className="form-input"
                      name="description"
                      as="textarea"
                    />
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

export default EditItem;
