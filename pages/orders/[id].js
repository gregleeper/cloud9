import { API, graphqlOperation } from "aws-amplify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import { getOrder } from "../../src/graphql/queries";
import moment from "moment";
import { formatMoney } from "../../utils";

const Order = () => {
  const router = useRouter();
  const [order, setOrder] = useState();
  const orderId = router.query.id;

  const getOrderDetails = async () => {
    const order = await API.graphql(
      {
        query: getOrder,
        authMode: "API_KEY"
      }
    );
    setOrder(order.data.getOrder);
  };

  useEffect(() => {
    getOrderDetails();
  }, [orderId]);
  console.log(order);
  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-2xl text-gray-900 text-center py-8">
            Order Info
          </h1>
        </div>
        <div>
          <div className="border border-gray-300 shadow bg-white  w-full md:w-9/12 lg:w-7/12 xl:w-5/12 ">
            {order ? (
              <div className=" ">
                <div className=" flex justify-around items-center text-center border-b-2 border-blue-800">
                  <div>
                    <h2 className="text-5xl text-gray-800">
                      {moment(order.createdAt).format("MM/DD")}
                    </h2>
                    <span className="text-gray-500 text-sm">Order Date</span>
                  </div>
                  <div>
                    <h2 className="text-5xl text-gray-800">
                      {order.deliveryPeriod}
                    </h2>
                    <span className="text-gray-500 text-sm">
                      Delivery Period
                    </span>
                  </div>
                </div>
                <div className="px-6 py-2">
                  <div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
                    <div>
                      <span className="text-gray-500 text-sm">Customer</span>
                    </div>
                    <div>
                      <span>{order.customerEmail}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
                    <div>
                      <span className="text-gray-500 text-sm">
                        Delivery Location
                      </span>
                    </div>
                    <div>
                      <span>{order.deliveryLocation}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
                    <div>
                      <span className="text-gray-500 text-sm">Total</span>
                    </div>
                    <div>
                      <span>${formatMoney(order.total)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
                    <div>
                      <span className="text-gray-500 text-sm">
                        Change Required
                      </span>
                    </div>
                    <div>
                      {order.changeRequired > 0 ? (
                        <span>${formatMoney(order.changeRequired)}</span>
                      ) : (
                        <span>none</span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b-2 border-gray-200">
                    <div>
                      <span className="text-gray-500 text-sm">
                        Order Status
                      </span>
                    </div>
                    <div>
                      <span>{order.status}</span>
                    </div>
                  </div>
                  <div className="w-full py-4">
                    <span className="text-gray-600 text-lg">Items</span>
                    <div>
                      {order.items.items.map((i, index) => (
                        <div>
                          <div className="flex justify-between">
                            <div>Item {index + 1}</div>
                            <div>
                              <span>{i.item.name}</span>
                            </div>
                            <div>
                              <span>Qty: </span>
                              <span>{i.quantity}</span>
                            </div>
                          </div>
                          {i.addIns.items.length > 0 ? (
                            <div className="flex justify-between items-center">
                              <div>
                                <span>Item {index + 1} AddIns: </span>
                              </div>
                              <div>
                                {i.addIns.items.map((a) => (
                                  <div className="flex justify-between">
                                    <div className="truncate w-8/12">
                                      <span>{a.addIn.name}</span>
                                    </div>
                                    <div>
                                      <span>Qty: {a.quantity}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
