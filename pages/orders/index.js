import Layout from "../../components/layout";
import {
  onCreateOrderItem,
  onUpdateOrder,
  onDeleteAddIn,
} from "../../src/graphql/subscriptions";
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { useEffect, useState } from "react";
import {
  listOrders,
  ordersByStatusByCreatedAt,
  ordersByStatusByPeriod,
} from "../../src/graphql/queries";

import { updateOrder } from "../../src/graphql/mutations";
import Order from "../../components/order";

const Orders = ({ authenticated, isManager, isStaff }) => {
  const [orders, setOrders] = useState();
  const [ordersInFullfillment, setOrdersInFullfillment] = useState();
  const [selectedPeriodForCreatedOrders, setSelectedPeriodForCreatedOrders] =
    useState(0);
  const [
    selectedPeriodForFullfillmentOrders,
    setSelectedPeriodForFullfillmentOrders,
  ] = useState(0);

  useEffect(() => {
    getFullfillmentOrders(selectedPeriodForFullfillmentOrders);
  }, [selectedPeriodForFullfillmentOrders]);

  useEffect(() => {
    getOrders(selectedPeriodForCreatedOrders);
  }, [selectedPeriodForCreatedOrders]);

  const getOrders = async (period) => {
    if (period == 0) {
      getNewOrders();
    } else getFilteredOrders(period);
  };

  const getFullfillmentOrders = async (period) => {
    if (period == 0) {
      getOrdersInFullfillment();
    } else getFilteredOrdersInFullfillment(period);
  };

  const getNewOrders = async () => {
    try {
      const { data, loading, errors } = await API.graphql(
        graphqlOperation(ordersByStatusByPeriod, {
          status: "created",
          sortDirection: "ASC",
        })
      );
      setOrders(data.ordersByStatusByPeriod.items);
    } catch (errors) {
      console.log(errors);
    }
  };

  const getFilteredOrders = async (period) => {
    const { data, loading, errors } = await API.graphql(
      graphqlOperation(ordersByStatusByPeriod, {
        status: "created",
        sortDirection: "ASC",
        filter: {
          deliveryPeriod: {
            eq: period,
          },
        },
      })
    );
    if (errors) {
      console.log(errors);
    }
    if (data) {
      setOrders(data.ordersByStatusByPeriod.items);
    }
  };

  const getOrdersInFullfillment = async () => {
    try {
      const { data, loading, error } = await API.graphql(
        graphqlOperation(ordersByStatusByPeriod, {
          status: "In-Fullfillment",
          sortDirection: "ASC",
        })
      );
      console.log(error);
      setOrdersInFullfillment(data.ordersByStatusByPeriod.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredOrdersInFullfillment = async (period) => {
    const { data, loading, error } = await API.graphql(
      graphqlOperation(ordersByStatusByPeriod, {
        status: "In-Fullfillment",
        sortDirection: "ASC",
        filter: { deliveryPeriod: { eq: period } },
      })
    );

    if (data) {
      setOrdersInFullfillment(data.ordersByStatusByPeriod.items);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    console.log(orderId, status);
    await API.graphql({
      query: updateOrder,
      variables: { input: { id: orderId, status } },
    });
  };

  const orderStream = () =>
    API.graphql({
      query: onCreateOrderItem,
    }).subscribe({
      next: () => {
        getNewOrders();
      },
    });

  const orderUpdateStream = () => {
    API.graphql({
      query: onUpdateOrder,
    }).subscribe({
      next: () => {
        getNewOrders();
        getOrdersInFullfillment();
      },
    });
  };

  useEffect(() => {
    getNewOrders();
    getOrdersInFullfillment();
    orderUpdateStream();
    orderStream();
  }, []);

  useEffect(() => {}, [orders]);

  useEffect(() => {}, [ordersInFullfillment]);

  return (
    <Layout>
      <div>
        <div className="relative w-1/2 mx-auto py-16 ">
          <div className="bg-gold transform rotate-2 w-full m-auto h-16 absolute inset-0"></div>
          <div className="bg-gray-700 w-full m-auto h-16 absolute inset-0 transform rotate-1"></div>

          <h2 className="text-white text-5xl relative z-10 text-center leading-none text-shadow-lg font-display">
            Orders
          </h2>
        </div>

        <div className="md:flex justify-around items-start">
          <div className="text-gray-900 lg:w-5/12 md:w-6/12 w-full mr-6">
            <div className="flex justify-between">
              <div>
                <h6 className="text-xl">Created Orders</h6>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="pr-4">
                <span>Filter Orders by Period:</span>
              </div>
              <div>
                <select
                  className="form-select"
                  onChange={(e) =>
                    setSelectedPeriodForCreatedOrders(e.target.value)
                  }
                >
                  <option value={0}>All</option>
                  <option value={2}>2nd Period</option>
                  <option value={3}>3rd Period</option>
                  <option value={4}>4th Period</option>
                  <option value={5}>5th Period</option>
                  <option value={6}>6th Period</option>
                </select>
              </div>
            </div>
            <div></div>
            <ul>
              {orders &&
                orders.map((o) => (
                  <div
                    key={o.id}
                    className="py-4 text-gray-900 border border-gray-500 bg-white bg-opacity-75 p-12 rounded shadow-sm my-4"
                  >
                    <Order
                      order={o}
                      handleUpdateOrderStatus={(id, status) =>
                        updateOrderStatus(id, status)
                      }
                    />
                  </div>
                ))}
            </ul>
          </div>
          <div className="py-12 md:py-0 lg:w-5/12 md:w-6/12 w-full ml-2">
            <div>
              <h6 className="text-gray-900 text-xl">Orders in Fullfillment</h6>
            </div>
            <div className="flex justify-start items-center">
              <div className="pr-6">
                <span>Filter Orders by Period:</span>
              </div>
              <div>
                <select
                  className="form-select"
                  onChange={(e) =>
                    setSelectedPeriodForFullfillmentOrders(e.target.value)
                  }
                >
                  <option value={0}>All</option>
                  <option value={2}>2nd Period</option>
                  <option value={3}>3rd Period</option>
                  <option value={4}>4th Period</option>
                  <option value={5}>5th Period</option>
                  <option value={6}>6th Period</option>
                </select>
              </div>
            </div>
            <div className="">
              <ul>
                {ordersInFullfillment &&
                  ordersInFullfillment.map((o) => (
                    <div
                      key={o.id}
                      className="py-4 text-gray-900 border border-gray-500 bg-white bg-opacity-75 p-12 rounded shadow-sm my-4"
                    >
                      <Order
                        order={o}
                        handleUpdateOrderStatus={(id, status) =>
                          updateOrderStatus(id, status)
                        }
                      />
                    </div>
                  ))}
              </ul>
            </div>
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
    isManager =
      signInUserSession.accessToken.payload["cognito:groups"].includes(
        "Managers"
      );

    isStaff =
      signInUserSession.accessToken.payload["cognito:groups"].includes("Staff");
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

export default Orders;
