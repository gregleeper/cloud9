import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { listItems, listCategorys } from "../../src/graphql/queries";
import { createItem, deleteItem } from "../../src/graphql/mutations";
import { Formik, Form, Field } from "formik";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/layout";
import { formatMoney } from "../../utils";
import Modal from "react-modal";

const customModalStyles = {
  top: "25%",
  left: "25%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
};

const CreateItem = () => {
  const [items, setItems] = useState();
  const [categories, setCategories] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
    fetch(
      "https://api.vercel.com/v1/integrations/deploy/QmY58qnSQ83vP7HrtRXVbWkKn1HjcJ9XLRsKkSko54jsqV/FkR9L18skN"
    )
      .then((res) => res.json())
      .then((data) => data);

    closeModal();
  };

  return (
    <Layout>
      <div>
        <h1 className="text-5xl text-gray-800 text-center font-display py-4">
          Items
        </h1>
      </div>
      <div className="lg:flex justify-between">
        <div className="mx-6 lg:w-5/12 w-10/12">
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
              fetch(
                "https://api.vercel.com/v1/integrations/deploy/QmY58qnSQ83vP7HrtRXVbWkKn1HjcJ9XLRsKkSko54jsqV/FkR9L18skN"
              )
                .then((res) => res.json())
                .then((data) => data);
              actions.resetForm({});
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-4">
                    <label
                      className="text-gray-900 w-1/4 md:w-1/2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <Field
                      className="form-input w-full"
                      name="name"
                      placeholder="Item Name"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <label
                      className="text-gray-900 w-1/4 md:w-1/2"
                      htmlFor="price"
                    >
                      Price
                    </label>

                    <Field
                      className="form-input w-full"
                      name="price"
                      type="number"
                      placeholder="1"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4 w-full">
                    <label
                      className="text-gray-900 w-1/4 md:w-1/2 pr-4"
                      name="description"
                    >
                      Description
                    </label>
                    <Field
                      className="form-input w-full"
                      name="description"
                      as="textarea"
                      placeholder="Write a short description (optional)"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <label
                      className="w-1/4 text-gray-900 md:w-1/2"
                      htmlFor="categoryId"
                    >
                      Category
                    </label>
                    <Field
                      className="form-select w-full"
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
                    className="flex justify-between w-full py-2"
                    id="exact-change-group"
                  >
                    Is Available?
                    <div
                      className="flex justify-end items-center w-full"
                      role="group"
                      aria-labelledby="exact-change-group"
                    >
                      <div className="mx-6 ">
                        <label className="mr-1 ">Yes</label>
                        <Field
                          className="form-radio"
                          name="isAvailable"
                          type="radio"
                          value="True"
                        />
                      </div>
                      <div>
                        <label className="mr-1">No</label>
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
          <div className="flex flex-wrap ">
            {items &&
              items.map((i) => (
                <div
                  key={i.id}
                  className="md:p-4 py-6 lg:w-6/12 md:w-6/12 sm:w-6/12 w-7/12 xl:w-4/12 mx-auto "
                >
                  <div className="border border-gray-500 rounded-md hover:shadow-lg bg-white px-6 py-6 min-h-full">
                    <div className="mb-2 h-30">
                      <p className="text-lg font-title">{i.name}</p>
                      <p className="text-sm text-gray-700 mt-2">
                        {i.description}
                      </p>
                      <p className="text-sm mt-2">${formatMoney(i.price)}</p>
                    </div>
                    <div className="flex justify-between">
                      <button
                        className="text-red-700 transform hover:scale-x-105 hover:scale-y-105 text-2xl"
                        onClick={openModal}
                      >
                        <FaTrash />
                      </button>
                      <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customModalStyles}
                        contentLabel="Delete Item Dialog"
                      >
                        <div className="flex h-48">
                          <div className="m-auto">
                            <div className="">
                              <span>
                                Deletion of items is disabled for now. Please
                                edit the item so that it is no longer available.
                                {`${i.name}`}?
                              </span>
                            </div>
                            <button
                              className="btn-delete mr-2"
                              onClick={() => handleDelete(i.id)}
                              disabled={true}
                            >
                              Delete
                            </button>
                            <button
                              className="border border-blue-600 text-blue-600 rounded-lg px-2 py-1"
                              onClick={closeModal}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </Modal>
                      <button className="text-blue-700 text-2xl transform hover:scale-x-105 hover:scale-y-105">
                        <Link href="/item/edit[id]" as={`/item/edit/${i.id}`}>
                          <a>
                            <FaPencilAlt />
                          </a>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
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

export default CreateItem;
