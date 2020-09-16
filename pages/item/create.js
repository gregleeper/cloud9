import { API, graphqlOperation, JS } from "aws-amplify";
import { listItems, listCategorys } from "../../src/graphql/queries";
import { createItem, deleteItem } from "../../src/graphql/mutations";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/layout";
import { formatMoney } from "../../utils";

const CreateItem = () => {
  const [items, setItems] = useState();
  const [categories, setCategories] = useState();

  const getCategories = async () => {
    const { data, loading, error } = await API.graphql({
      query: listCategorys,
      authMode: "API_KEY",
    });
    if (data) {
      setCategories(data.listCategorys.items);
    }
  };

  const getItems = async () => {
    const {
      data: itemsData,
      loading: itemsLoading,
      error: itemsError,
    } = await API.graphql({ query: listItems, authMode: "API_KEY" });
    if (itemsData) {
      setItems(itemsData.listItems.items);
    }
  };

  useEffect(() => {
    getItems();
    getCategories();
  }, []);

  const handleDelete = async (id) => {
    const {
      data: deletedItem,
      error: deletedItemError,
      loading: deletedItemLoading,
    } = await API.graphql({
      query: deleteItem,
      variables: { input: { id } },
      authMode: "API_KEY",
    });
    if (deletedItem) {
      const filteredItems = items.filter((i) => i.id !== id);
      setItems(filteredItems);
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="text-4xl text-gray-800 text-center">Items</h1>
      </div>
      <div className="sm:flex justify-between">
        <div className="mr-12">
          <div className="py-4">
            <h4 className="text-xl text-gray-900">Create an Item</h4>
          </div>
          <Formik
            initialValues={{
              name: "",
              price: 0,
              description: "",
              categoryId: "",
              isAvailable: "",
            }}
            onSubmit={async (values, actions) => {
              await API.graphql({
                query: createItem,
                variables: {
                  input: {
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    categoryId: values.categoryId,
                    isAvailable: values.isAvailable,
                  },
                },
                authMode: "API_KEY",
              });
              getItems();
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
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-gray-900" htmlFor="price">
                      Price
                    </label>

                    <Field
                      className="form-input"
                      name="price"
                      type="number"
                      placeholder="1"
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
                  <div className="flex justify-between items-center mb-4">
                    <label name="categoryId">Category</label>
                    <Field
                      className="form-select"
                      name="categoryId"
                      as="select"
                      placeholder="Choose a category"
                    >
                      <option value="">Select a Category</option>
                      {categories &&
                        categories.map((c) => (
                          <option value={c.id}>{c.name}</option>
                        ))}
                    </Field>
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
              {items &&
                items.map((i) => (
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
                        <Link href="/item/edit[id]" as={`/item/edit/${i.id}`}>
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

export default CreateItem;
