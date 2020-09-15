import Layout from "../components/layout";
import { useCart } from "../pages/_app";
import useAmplifyAuth from "../lib/useAmplifyAuth";
import { formatMoney } from "../utils";
import {
  createOrder,
  createOrderItem,
  createOrderItemAddIn,
} from "../src/graphql/mutations";
import { getOrder } from "../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { Formik, Field, Form } from "formik";
import { orderSchema } from "../lib/orderSchema";

const Cart = () => {
  const cart = useCart();
  const { state } = useAmplifyAuth();

  return (
    <Layout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl text-gray-800">Cart</h1>
        </div>
        <div>
          <div>
            <ul>
              {cart.cartItems.length > 0 &&
                cart.cartItems.map((i) => (
                  <div
                    key={i.id}
                    className="text-gray-900 text-md mb-6 w-4/12 flex justify-between"
                  >
                    <li>
                      <span className="text-lg mr-8 ">{i.name}</span>
                      <span>${formatMoney(i.price)}</span>

                      <div className="">
                        <div className="flex justify-between">
                          <button
                            className="bg-red-600 text-white px-2 -py-1 rounded-md disabled:opacity-50"
                            onClick={() => cart.decrease(i)}
                            disabled={i.quantity === 1}
                          >
                            -
                          </button>
                          <span>{`Qty: ${i.quantity}`}</span>

                          <button
                            className="bg-green-600 text-white px-2 -py-1 rounded-md"
                            onClick={() => cart.increase(i)}
                          >
                            +
                          </button>
                        </div>
                        <div className="mt-2">
                          <button
                            className="text-center w-full btn-delete text-sm"
                            onClick={() => cart.removeProduct(i)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                    <div className="w-1/2">
                      {i.addIns.length > 0 && (
                        <>
                          <div>
                            <span>Add Ins:</span>
                          </div>
                          <div>
                            {i.addIns.map((addIn) => (
                              <div>
                                <span>{addIn.name}</span>
                                <span> x {addIn.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </ul>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Total</h3>
          <span className="text-gray-700">${formatMoney(cart.total)}</span>
        </div>
        <div className="mt-4">
          <button className="btn-delete" onClick={() => cart.clearCart()}>
            Clear Cart
          </button>
        </div>
        <div className="mt-4">
          <Formik
            initialValues={{
              deliveryPeriod: "",
              deliveryLocation: "",
              exactBool: null,
              changeRequired: 0,
            }}
            validationSchema={orderSchema}
            enableReinitialize
            onSubmit={async (values, actions) => {
              const customerEmail = state.user.attributes.email;
              if (values.exactBool === "false") {
                values.changeRequired = values.payAmount - cart.total;
              }

              try {
                const order = await API.graphql({
                  query: createOrder,
                  variables: {
                    input: {
                      customerEmail,
                      status: "created",
                      total: cart.total,
                      deliveryPeriod: values.deliveryPeriod,
                      deliveryLocation: values.deliveryLocation,
                      changeRequired: values.changeRequired,
                    },
                  },
                  authMode: "API_KEY",
                });
                const orderId = order.data?.createOrder.id;

                cart.cartItems.map(async (i) => {
                  const orderItem = await API.graphql({
                    query: createOrderItem,
                    variables: {
                      input: {
                        itemId: i.id,
                        orderId: orderId,
                        quantity: i.quantity,
                      },
                    },
                    authMode: "API_KEY",
                  });

                  i.addIns.map(
                    async (addIn) =>
                      await API.graphql({
                        query: createOrderItemAddIn,
                        variables: {
                          input: {
                            orderItemId: orderItem.data.createOrderItem.id,
                            addInId: addIn.id,
                            quantity: addIn.quantity,
                          },
                        },
                        authMode: "API_KEY",
                      })
                  );
                });
              } catch (err) {
                console.log(err);
              }
              cart.clearCart();
              actions.resetForm({});
            }}
          >
            {({ isSubmitting, errors, touched, values }) => (
              <Form>
                <div className="flex justify-between md:w-8/12 w-full py-2">
                  <label htmlFor="deliveryPeriod">Delivery Period</label>
                  <Field
                    className="form-select w-full ml-4"
                    name="deliveryPeriod"
                    as="select"
                  >
                    <option value="">Select a Period to Deliver</option>
                    <option value={2}>2nd Period</option>
                    <option value={3}>3rd Period</option>
                    <option value={4}>4th Period</option>
                    <option value={5}>5th Period</option>
                    <option value={6}>6th Period</option>
                  </Field>
                  {errors.deliveryPeriod && touched.deliveryPeriod ? (
                    <div className="text-red-700 ml-4">
                      {errors.deliveryPeriod}
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between md:w-8/12 w-full py-2">
                  <label>Delivery Location</label>
                  <Field
                    className="form-input w-full ml-4"
                    name="deliveryLocation"
                  />
                  {errors.deliveryLocation && touched.deliveryLocation ? (
                    <div className="text-red-700 ml-4">
                      {errors.deliveryLocation}
                    </div>
                  ) : null}
                </div>
                <div
                  className="flex justify-between md:w-8/12 w-full py-2"
                  id="exact-change-group"
                >
                  Do you have exact change?
                  <div
                    className="flex justify-around items-center w-1/2"
                    role="group"
                    aria-labelledby="exact-change-group"
                  >
                    <div>
                      <label className="mr-2">Yes</label>
                      <Field name="exactBool" type="radio" value="True" />
                    </div>
                    <div>
                      <label className="mr-2">No</label>
                      <Field name="exactBool" type="radio" value="false" />
                    </div>
                  </div>
                </div>
                {values.exactBool === "false" && (
                  <div className="flex justify-between md:w-8/12 w-full py-2">
                    <label>
                      Please input dollar amount you're paying with:
                    </label>
                    <Field
                      className="form-input w-full"
                      name="payAmount"
                      type="number"
                      as="input"
                    />
                  </div>
                )}

                <button
                  className="btn-submit mt-4"
                  disabled={
                    !state.user || cart.cartItems.length === 0 || isSubmitting
                  }
                  type="submit"
                >
                  Submit Order
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
