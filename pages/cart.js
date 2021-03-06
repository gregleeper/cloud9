import Layout from "../components/layout";
import { useCart } from "../pages/_app";
import useAmplifyAuth from "../lib/useAmplifyAuth";
import { formatMoney } from "../utils";
import {
  createOrder,
  createOrderItem,
  createOrderItemAddIn,
  createCustomer,
} from "../src/graphql/mutations";
import { getCustomerByEmail } from "../src/graphql/queries";
import { API } from "aws-amplify";
import { Formik, Field, Form } from "formik";
import { orderSchema } from "../lib/orderSchema";

const Cart = () => {
  const cart = useCart();
  const { state } = useAmplifyAuth();

  const processOrder = async (values, customerEmail, hasLoyaltyCard) => {
    const order = await API.graphql({
      query: createOrder,
      variables: {
        input: {
          customerEmail,
          status: "created",
          hasLoyaltyCard,
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
  };

  return (
    <Layout>
      <div>
        <div className="relative w-full sm:w-8/12 md:w-7/12 lg:w-1/2 mx-auto py-24">
          <div className="bg-gold transform rotate-2 w-full m-auto h-16 absolute inset-0"></div>
          <div className="bg-blue-900 w-full m-auto h-16 absolute inset-0 transform rotate-1"></div>

          <h2 className="text-white md:text-5xl sm:text-4xl text-3xl relative z-10 text-center leading-none text-shadow-lg font-display">
            Cart
          </h2>
        </div>
        <div>
          <div>
            <ul>
              {cart.cartItems.length > 0 &&
                cart.cartItems.map((i) => (
                  <div
                    key={i.id}
                    className="text-gray-900 text-md mb-6 w-full lg:w-8/12 flex justify-between bg-white border-gray-400 border shadow p-4"
                  >
                    <li>
                      <span className="text-lg mr-8 font-title ">{i.name}</span>
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
                                <span className="font-title">{addIn.name}</span>
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
              exactBool: "",
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
                const customer = await API.graphql({
                  query: getCustomerByEmail,
                  variables: {
                    customerEmail,
                  },
                  authMode: "API_KEY",
                });

                if (customer.data.getCustomerByEmail.items.length == 0) {
                  const createdCustomer = await API.graphql({
                    query: createCustomer,
                    variables: {
                      input: {
                        customerEmail,
                        hasLoyaltyCard: false,
                      },
                    },
                    authMode: "API_KEY",
                  });
                  processOrder(values, customerEmail, false);
                }

                if (
                  customer.data.getCustomerByEmail.items.length > 0 &&
                  customer.data.getCustomerByEmail.items[0].hasLoyaltyCard
                ) {
                  console.log(customer);
                  processOrder(values, customerEmail, true);
                } else {
                  processOrder(values, customerEmail, false);
                }
              } catch (err) {
                console.log(err);
              }
              cart.clearCart();
              actions.resetForm({});
            }}
          >
            {({ isSubmitting, errors, touched, values }) => (
              <Form>
                <div className="flex justify-between lg:w-8/12 w-full py-2">
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
                  </Field>
                  {errors.deliveryPeriod && touched.deliveryPeriod ? (
                    <div className="text-red-700 ml-4">
                      {errors.deliveryPeriod}
                    </div>
                  ) : null}
                </div>
                <div className="flex justify-between lg:w-8/12 w-full py-2">
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
                  className="flex justify-between lg:w-8/12 w-full py-2"
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
                      <Field
                        className="form-radio"
                        name="exactBool"
                        type="radio"
                        value="True"
                      />
                    </div>
                    <div>
                      <label className="mr-2">No</label>
                      <Field
                        className="form-radio"
                        name="exactBool"
                        type="radio"
                        value="false"
                      />
                    </div>
                    {errors.exactBool && touched.exactBool ? (
                      <div className="text-red-700 ml-4">
                        {errors.exactBool}
                      </div>
                    ) : null}
                  </div>
                </div>
                {values.exactBool === "false" && (
                  <div className="flex justify-between lg:w-8/12 w-full py-2">
                    <label>
                      Please input dollar amount you're paying with:
                    </label>
                    {/* <Field
                      className="form-input w-full"
                      name="payAmount"
                      type="number"
                      as="input"
                    /> */}
                    <p className="px-2 py-6 bg-red-200 text-gray-900 text-lg">
                      We do not have change at the moment. You will not be able
                      to complete an order without having exact change.
                    </p>
                  </div>
                )}

                <button
                  className="btn-submit mt-4"
                  disabled={
                    !state.user ||
                    cart.cartItems.length === 0 ||
                    isSubmitting ||
                    values.exactBool === "false"
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
