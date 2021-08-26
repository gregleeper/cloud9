import Layout from "../components/layout";
import { useCart } from "../pages/_app";
import useAmplifyAuth from "../lib/useAmplifyAuth";
import { formatMoney } from "../utils";
import { useRouter } from "next/router";
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
import { useEffect, useState } from "react";

const Cart = () => {
  const cart = useCart();
  const [customer, setCustomer] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();
  const { state } = useAmplifyAuth();

  async function createNewCustomer() {
    await API.graphql({
      query: createCustomer,
      variables: {
        input: {
          customerEmail: state.user.attributes.email,
          hasLoyaltyCard: false,
        },
      },
      authMode: "API_KEY",
    });
  }

  async function getCustomer() {
    const user = await API.graphql({
      query: getCustomerByEmail,
      variables: {
        customerEmail: state.user.attributes.email,
      },
      authMode: "API_KEY",
    });
    if (user.data.getCustomerByEmail.items.length > 0) {
      setCustomer(user.data.getCustomerByEmail.items[0]);
    } else {
      createNewCustomer();
    }
  }

  useEffect(() => {
    if (state.user) {
      getCustomer();
    }
  }, [state]);

  const processOrder = async (values) => {
    const order = await API.graphql({
      query: createOrder,
      variables: {
        input: {
          customerEmail: customer.customerEmail,
          status: "created",
          hasLoyaltyCard: customer.hasLoyaltyCard,
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
    setOrderId(orderId);
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
              payAmount: 0,
              changeRequired: 0,
            }}
            validationSchema={orderSchema}
            enableReinitialize
            onSubmit={async (values, actions) => {
              if (values.payAmount >= cart.total) {
                values.changeRequired = values.payAmount - cart.total;
              }

              try {
                await processOrder(values);
                cart.clearCart();
                actions.resetForm({});

                router.push(`/my-orderes`);

                // if (
                //   customer.data.getCustomerByEmail.items.length > 0 &&
                //   customer.data.getCustomerByEmail.items[0].hasLoyaltyCard
                // ) {
                //   console.log(customer);
                //   processOrder(values, customerEmail, true);
                // } else {
                //   processOrder(values, customerEmail, false);
                // }
              } catch (err) {
                console.log(err);
              }
            }}
          >
            {({ isSubmitting, errors, touched, values }) => (
              <Form>
                <div className="grid grid-cols-6  py-2 md:w-8/12">
                  <label className="sm:mr-2" htmlFor="deliveryPeriod">
                    Delivery Period
                  </label>
                  <Field
                    className="form-select w-full mr-4 col-span-4 md:mx-4 md:col-start-3 col-start-2 md:col-span-3"
                    name="deliveryPeriod"
                    as="select"
                  >
                    <option value="">Select a Period to Deliver</option>
                    <option value={2}>2nd Period</option>
                    <option value={3}>3rd Period</option>
                    <option value={4}>4th Period</option>
                    <option value={5}>5th Period</option>
                    <option value={6}>6th Period</option>
                    <option value={7}>7th Period</option>
                    <option value={8}>8th Period</option>
                  </Field>
                  {errors.deliveryPeriod && touched.deliveryPeriod ? (
                    <div className="text-red-700 ml-4 flex justify-center items-center">
                      {errors.deliveryPeriod}
                    </div>
                  ) : null}
                </div>
                <div className="grid grid-cols-6 py-2 md:w-8/12 ">
                  <label className="sm:mr-2">Delivery Location</label>
                  <Field
                    className="form-input w-full col-span-4 md:mx-4 md:col-start-3 col-start-2 md:col-span-3"
                    name="deliveryLocation"
                  />
                  {errors.deliveryLocation && touched.deliveryLocation ? (
                    <div className="text-red-700 ml-4 flex justify-center items-center ">
                      {errors.deliveryLocation}
                    </div>
                  ) : null}
                </div>
                <div className="grid grid-cols-6 py-2 md:w-8/12">
                  <label className="sm:mr-2">Amount Paid - $</label>
                  <Field
                    className="form-input w-full md:mx-4 md:col-start-3 col-start-2 col-span-4 md:col-span-3"
                    name="payAmount"
                    type="number"
                  />
                  {errors.payAmount && touched.payAmount ? (
                    <div className="text-red-700 ml-4 flex justify-center items-center">
                      {errors.payAmount}
                    </div>
                  ) : null}
                </div>

                <button
                  className="btn-submit mt-4 md:mx-auto"
                  disabled={
                    (errors && errors.deliveryLocation) ||
                    (errors && errors.deliveryPeriod) ||
                    (touched && !touched.deliveryPeriod) ||
                    !touched.deliveryLocation ||
                    !touched.payAmount ||
                    !state.user ||
                    cart.cartItems.length === 0 ||
                    isSubmitting ||
                    (values.payAmount - cart.total < 0 &&
                      !customer.hasLoyaltyCard)
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
