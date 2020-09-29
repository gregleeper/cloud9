import Layout from "../../components/layout";
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import { listOrderItems, listItems } from "../../src/graphql/queries";
import { useEffect, useState, useMemo } from "react";
import Table, { GlobalFilter } from "../../components/table";
import { formatMoney } from "../../utils";
import { FaBinoculars } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";
import _ from "lodash";

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [itemSummary, setItemSummary] = useState([]);

  const populateItemSummary = async () => {
    let totals = [];

    items.map((item) => {
      const quantitySoldPerItem = item.orders.items.reduce(
        (acc, order) => acc + order.quantity,
        0
      );

      totals.push({
        itemName: item.name,
        totalSold: quantitySoldPerItem,
      });
    });
    console.log(totals);
    setItemSummary(totals);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Item",
        accessor: "itemName",
      },
      {
        Header: "Total Sold",
        accessor: "totalSold",
        disableFilters: true,
      },

      // {
      //   Header: "Total",
      //   accessor: `total`,
      //   Cell: ({ value }) => (
      //     <div className="text-center">
      //       <span>{`$${formatMoney(value)}`}</span>
      //     </div>
      //   ),
      //   disableFilters: true,
      //   Footer: (info) => {
      //     const orderTotal = useMemo(
      //       () => info.rows.reduce((sum, row) => row.values.total + sum, 0),
      //       [info.rows]
      //     );
      //     return (
      //       <div className="py-2 text-center flex justify-around items-center border-t-4 border-gray-900">
      //         <div>
      //           <span className="text-gray-600">Total:</span>{" "}
      //         </div>
      //         <div>
      //           <span className="text-lg font-bold">
      //             ${formatMoney(orderTotal)}
      //           </span>
      //         </div>
      //       </div>
      //     );
      //   },
      // }
    ],
    []
  );

  useEffect(() => {
    getOrders();
    getItems();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      populateItemSummary();
    }
  }, [orders]);

  const getOrders = async () => {
    const { data, loading, errors } = await API.graphql(
      graphqlOperation(listOrderItems)
    );
    if (data) {
      setOrders(data.listOrderItems.items);
    }
  };

  const getItems = async () => {
    const { data, loading, errors } = await API.graphql(
      graphqlOperation(listItems)
    );
    if (errors) {
      console.log(errors);
    }
    if (data) {
      setItems(data.listItems.items);
    }
  };

  return (
    <Layout>
      <div>
        <div className="">
          <div className="text-2xl text-gray-800 text-center py-6  w-1/4 mx-auto">
            <h1>Popularity per Item</h1>
          </div>
        </div>
        <button onClick={() => populateItemSummary()}>click</button>
        <div>
          <Table columns={columns} data={itemSummary} />
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

export default CompletedOrders;
