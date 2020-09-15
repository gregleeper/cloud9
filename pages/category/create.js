import { API, graphqlOperation } from "aws-amplify";
import { createCategory, deleteCategory } from "../../src/graphql/mutations";
import { listCategorys } from "../../src/graphql/queries";
import { Formik, Form, Field } from "formik";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import Link from "next/link";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  const GetCategories = async () => {
    const listOfCategories = await API.graphql({
      query: listCategorys,
      authMode: "API_KEY",
    });
    if (listOfCategories.data) {
      setCategories(listOfCategories.data.listCategorys.items);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await API.graphql({
        query: deleteCategory,
        variables: { input: { id } },
        authMode: "API_KEY",
      });
    } catch (err) {
      console.log(err);
    }

    const filteredCategories = categories.filter((c) => c.id !== id);
    setCategories(filteredCategories);
  };

  useEffect(() => {
    GetCategories();
  }, []);

  return (
    <Layout>
      <div className="text-gray-900">
        <div className="w-1/2 mx-auto">
          <h1 className="text-3xl text-center">Create Category</h1>
        </div>
        <div className="md:flex md:justify-between ">
          <div className="md:w-4/12 w-10/12 mr-4 mb-4 mt-16">
            <Formik
              initialValues={{
                name: "",
              }}
              onSubmit={async (values) => {
                const newCategory = await API.graphql({
                  query: createCategory,
                  variables: { input: { name: values.name } },
                  authMode: "API_KEY",
                });
                console.log(newCategory);
                setCategories([...categories, newCategory.data.createCategory]);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="flex justify-between items-center">
                    <label htmlFor="name">Category Name</label>
                    <Field
                      className="form-input w-full"
                      name="name"
                      placeholder="Name of Category"
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      className="btn-submit"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="md:w-7/12 w-10/12 mx-auto md:mt-12 md:ml-16">
            <h6 className="text-xl font-bold ml-8">Categories</h6>

            <ul className="py-4 px-8">
              {categories &&
                categories.map((i) => (
                  <div key={i.id} className="py-4">
                    <li>
                      <span className="text-xl">{i.name}</span>
                    </li>
                    <button
                      className="btn-delete mr-2"
                      onClick={() => handleDeleteCategory(i.id)}
                    >
                      Delete
                    </button>
                    <button className="btn-edit">
                      <Link
                        href="/category/edit/[id]"
                        as={`/category/edit/${i.id}`}
                      >
                        <a>Edit</a>
                      </Link>
                    </button>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
