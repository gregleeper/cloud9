import Layout from "../../components/layout";
import { API, graphqlOperation } from "aws-amplify";
import { ordersByStatusByPeriod } from "../../src/graphql/queries";
import { useEffect, useState, useMemo } from "react";
import Table, { GlobalFilter } from "../../components/table";
import { formatMoney } from "../../utils";
import { FaBinoculars } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);

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
          <Link href="/order/[id]" as={`/order/${value}`}>
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

  useEffect(() => {
    getCompletedOrders();
  }, []);

  const getCompletedOrders = async () => {
    const { data, loading, errors } = await API.graphql(
      graphqlOperation(ordersByStatusByPeriod, {
        status: "Completed",
        sortDirection: "ASC",
      })
    );
    if (errors) {
      console.log(errors);
    }
    console.log(data);
    if (data) {
      setCompletedOrders(data.ordersByStatusByPeriod.items);
    }
  };

  return (
    <Layout>
      <div>
        <div className="text-2xl text-gray-800 text-center py-6">
          <h1>Completed Orders</h1>
        </div>

        <div>
          <Table columns={columns} data={completedOrders} />
        </div>
      </div>
    </Layout>
  );
};

export default CompletedOrders;
