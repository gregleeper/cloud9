import { API, graphqlOperation, JS } from "aws-amplify";
import { getItem, listCategorys } from "../../../src/graphql/queries";
import { updateItem } from "../../../src/graphql/mutations";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
import Layout from "../../../components/layout";
import Link from "next/link";

const EditItem = () => {
  const router = useRouter();
  const [categories, setCategories] = useState();
  const [item, setItem] = useState();

  const itemId = router.query.id;
  console.log(itemId);
  useEffect(() => {
    getCategories();
    getItemToEdit();
  }, [itemId]);

  const getCategories = async () => {
    const { data, loading, error } = await API.graphql(
      graphqlOperation(listCategorys)
    );
    if (data) {
      setCategories(data.listCategorys.items);
    }
  };

  const getItemToEdit = async () => {
    const {
      data: itemData,
      loading: itemLoading,
      error: itemError,
    } = await API.graphql(graphqlOperation(getItem, { id: itemId }));
    setItem(itemData.getItem);
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
              name: (item && item.name) || "",
              price: (item && item.price) || 0,
              description: (item && item.description) || "",
              categoryId: (item && item.categoryId) || "",
            }}
            enableReinitialize
            onSubmit={async (values, actions) => {
              await API.graphql(
                graphqlOperation(updateItem, {
                  input: {
                    name: values.name,
                    price: values.price,
                    description: values.description,
                    categoryId: values.categoryId,
                    id: itemId,
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
                    <label className="text-gray-900" htmlFor="price">
                      Price
                    </label>
                    <Field className="form-input" name="price" type="number" />
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
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-gray-900" name="categoryId">
                      Category
                    </label>
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
                  <div className="flex justify-center">
                    <button
                      className="btn-submit mr-2 "
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                    <button className="btn-delete ml-2">
                      <Link href="/item/create">
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
