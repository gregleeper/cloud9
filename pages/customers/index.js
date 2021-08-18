import Layout from "../../components/layout";
import { API } from "aws-amplify";
import { useEffect, useState, useMemo } from "react";
import { listCustomers } from "../../src/graphql/queries";
import { updateCustomer } from "../../src/graphql/mutations";
import Table from "../../components/table";
import Link from "next/link";
import { FaBinoculars } from "react-icons/fa";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    const {
      data: {
        listCustomers: { items: allCustomers },
      },
    } = await API.graphql({
      query: listCustomers,
    });
    setCustomers(allCustomers);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Customer Email",
        accessor: "customerEmail",
      },
      {
        Header: "Loyalty Card",
        accessor: "hasLoyaltyCard",
        Cell: ({ value }) => (value ? <div>Yes</div> : <div>No</div>),
      },
      {
        Header: "Edit",
        accessor: "id",
        Cell: ({ value }) => (
          <Link href="/customers/[id]" as={`/customers/${value}`}>
            <a>
              <FaBinoculars />
            </a>
          </Link>
        ),
      },
    ],
    []
  );

  function resetLoyaltyCards() {
    customers.map((c) => console.log(c));
  }

  return (
    <Layout>
      <div>
        <div className="text-3xl font-display text-gray-800 p-12 text-center">
          <h3>Customers</h3>
        </div>
        <button onClick={() => resetLoyaltyCards()}>Button</button>
        <div className=" max-w-6xl mx-auto">
          <Table data={customers} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
