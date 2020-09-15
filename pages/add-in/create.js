import { API, graphqlOperation, JS } from "aws-amplify";
import { listAddIns } from "../../src/graphql/queries";
import { createAddIn, deleteAddIn } from "../../src/graphql/mutations";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/layout";
import { formatMoney } from "../../utils";

const CreateAddIn = () => {
  const [addIns, setAddIns] = useState();

  const getAddIns = async () => {
    const {
      data: addInsData,
      loading: addInsLoading,
      error: addInsError,
    } = await API.graphql({ query: listAddIns, authMode: "API_KEY" });
    if (addInsData) {
      setAddIns(addInsData.listAddIns.items);
    }
  };

  useEffect(() => {
    getAddIns();
  }, []);

  const handleDelete = async (id) => {
    const {
      data: deletedItem,
      error: deletedItemError,
      loading: deletedItemLoading,
    } = await API.graphql({
      query: deleteAddIn,
      variables: { input: { id } },
      authMode: "API_KEY",
    });
    if (deletedItem) {
      const filteredItems = addIns.filter((i) => i.id !== id);
      setAddIns(filteredItems);
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="text-4xl text-gray-800 text-center">Add Ins</h1>
      </div>
      <div className="sm:flex justify-between">
        <div className="mr-12">
          <div className="py-4">
            <h4 className="text-xl text-gray-900">Create an Add In</h4>
          </div>
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            onSubmit={async (values, actions) => {
              await API.graphql({
                query: createAddIn,
                variables: {
                  input: {
                    name: values.name,

                    description: values.description,
                  },
                },
                authMode: "API_KEY",
              });
              getAddIns();
              actions.resetForm({});
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="w-full">
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
                  <div className="flex justify-between items-center mb-4 w-full">
                    <label className="text-gray-900 pr-4" name="description">
                      Description
                    </label>
                    <Field
                      className="form-input"
                      name="description"
                      as="textarea"
                      placeholder="Write a short description (optional)"
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="border border-blue-400 bg-blue-500 text-white py-2 px-4 rounded-lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="mt-16 sm:mt-0 w-full">
          <ul>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
              {addIns &&
                addIns.map((i) => (
                  <div key={i.id} className="md:p-4 py-6 md:w-10/12 w-full">
                    <li>
                      <div className="mb-2">
                        <p className="text-lg">{i.name}</p>
                        <p className="text-md text-gray-700">{i.description}</p>
                        <p className="text-md">${formatMoney(i.price)}</p>
                      </div>

                      <button
                        className="btn-delete mr-2"
                        onClick={() => handleDelete(i.id)}
                      >
                        Delete
                      </button>
                      <button className="btn-edit mr-2">
                        <Link
                          href="/add-in/edit[id]"
                          as={`/add-in/edit/${i.id}`}
                        >
                          <a>Edit</a>
                        </Link>
                      </button>
                    </li>
                  </div>
                ))}
            </div>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAddIn;
