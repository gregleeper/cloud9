import { useState, useEffect } from "react";
import Table from "../components/table";
import Layout from "../components/layout";
import { ordersByCustomerEmail } from "../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import useAmplifyAuth from "../lib/useAmplifyAuth";
import moment from "moment";
import { formatMoney } from "../utils";
import Link from "next/link";
import { FaBinoculars } from "react-icons/fa";

const MyOrders = () => {
  const [customerOrders, setCustomerOrders] = useState([]);
  const auth = useAmplifyAuth();

  const getCustomerOrders = async (userEmail) => {
    const myOrders = await API.graphql(
      graphqlOperation(ordersByCustomerEmail, {
        customerEmail: userEmail,
        sortDirection: "ASC",
      })
    );
    setCustomerOrders(myOrders.data.ordersByCustomerEmail.items);
  };

  useEffect(() => {
    if (!auth.state.isLoading && !auth.state.isError) {
      const userEmail = auth.state.user.attributes.email;
      getCustomerOrders(userEmail);
    }
  }, [auth.state.isLoading]);

  console.log(customerOrders);

  const columns = React.useMemo(
    () => [
      {
        Header: "Customer Email",
        accessor: "customerEmail",
      },
      {
        Header: "Order Status",
        accessor: "status",
        disableFilters: true,
      },
      {
        Header: "Time Placed",
        accessor: "createdAt",
        Cell: ({ value }) => (
          <div className="text-center">
            <span>{moment(value).format("MMM-DD  h:mm a")}</span>
          </div>
        ),
      },
      {
        Header: "Total",
        accessor: `total`,
        Cell: ({ value }) => (
          <div className="text-center">
            <span>{`$${formatMoney(value)}`}</span>
          </div>
        ),
        disableFilters: true,
      },
      {
        Header: "Delivery Period",
        accessor: "deliveryPeriod",
        Cell: ({ value }) => <div className="text-center">{value}</div>,
        disableFilters: true,
      },
      {
        Header: "Change Required",
        accessor: "changeRequired",
        Cell: ({ value }) => <div className="text-center">{value}</div>,
        disableFilters: true,
      },
      {
        Header: "View",
        accessor: "id",
        Cell: ({ value }) => (
          <Link href="/orders/[id]" as={`/orders/${value}`}>
            <a className="hover:text-blue-700 text-xl">
              <FaBinoculars />
            </a>
          </Link>
        ),
        disableFilters: true,
      },
    ],
    []
  );

  return (
    <Layout>
      <div>
        <div>
          <h1 className="text-2xl text-gray-800 text-center py-6">My Orders</h1>
        </div>
        <div>
          <Table columns={columns} data={customerOrders} />
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
