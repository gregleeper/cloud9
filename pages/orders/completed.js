import Layout from "../../components/layout";
import { API, graphqlOperation, withSSRContext } from "aws-amplify";
import DayPickerInput from "react-day-picker/DayPickerInput";
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from "react-day-picker/moment";
import "moment/locale/it";
import { ordersByStatusByPeriod } from "../../src/graphql/queries";
import { useEffect, useState, useMemo, useRef } from "react";
import Table, { GlobalFilter } from "../../components/table";
import { formatMoney } from "../../utils";
import { FaBinoculars } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [beginDate, setBeginDate] = useState();
  const [endDate, setEndDate] = useState();
  const modifiers = { start: beginDate, end: endDate };

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
            <span>{moment(value).format("MM/DD/YY  h:mm a")}</span>
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
        Footer: (info) => {
          const orderTotal = useMemo(
            () => info.rows.reduce((sum, row) => row.values.total + sum, 0),
            [info.rows]
          );
          return (
            <div className="py-2 text-center flex justify-around items-center border-t-4 border-gray-900">
              <div>
                <span className="text-gray-600">Total:</span>{" "}
              </div>
              <div>
                <span className="text-lg font-bold">
                  ${formatMoney(orderTotal)}
                </span>
              </div>
            </div>
          );
        },
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

  useEffect(() => {
    getCompletedOrders();
  }, []);

  useEffect(() => {
    if (beginDate && endDate) {
      getCompletedOrdersByDateRange();
    }
    if (!beginDate && !endDate) {
      getCompletedOrders();
    }
  }, [beginDate, endDate]);

  const inputEl = useRef(null);
  const onBeginDateClick = () => {
    inputEl.current;
  };

  const resetDateFilters = () => {
    setBeginDate();
    setEndDate();
  };
  console.log(beginDate);

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

  const handleBeginDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    const date = moment(selectedDay);
    date.subtract(11, "hours");
    setBeginDate(selectedDay);
  };
  const handleEndDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    const date = moment(selectedDay);
    date.add(11, "hours");

    setEndDate(date._d);
  };

  const getCompletedOrdersByDateRange = async () => {
    const { data, loading, errors } = await API.graphql(
      graphqlOperation(ordersByStatusByPeriod, {
        status: "Completed",
        sortDirection: "ASC",
        filter: {
          createdAt: {
            between: [beginDate, endDate],
          },
        },
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
        <div className="flex justify-center items-end">
          <div className="mr-4">
            <p>Choose a begin date:</p>
            <DayPickerInput
              value={beginDate}
              onDayChange={handleBeginDayChange}
              formatDate={formatDate}
              parseDate={parseDate}
              placeholder={`${formatDate(new Date())}`}
              dayPickerProps={{
                selectedDays: [beginDate, { beginDate, endDate }],
                disabledDays: { after: endDate },
                toMonth: endDate,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => onBeginDateClick(),
              }}
            />
          </div>
          <div>
            <p>Choose an End Date:</p>

            <DayPickerInput
              ref={inputEl}
              value={endDate}
              onDayChange={(day) => {
                const date = moment(day);

                date.add(11, "hours");

                setEndDate(date._d);
              }}
              formatDate={formatDate}
              parseDate={parseDate}
              placeholder={`${formatDate(new Date())}`}
              dayPickerProps={{
                selectedDays: [beginDate, { beginDate, endDate }],
                disabledDays: { before: beginDate },
                modifiers,
                month: beginDate,
                fromMonth: beginDate,
                numberOfMonths: 2,
              }}
            />
          </div>
          <div>
            <button
              className="ml-4 border border-gray-300 bg-gray-200 shadow px-2 py-1 hover:bg-gold hover:text-gray-900 text-shadow-lg"
              onClick={() => resetDateFilters()}
            >
              Clear Dates
            </button>
          </div>
        </div>
        <div>
          <Table columns={columns} data={completedOrders} />
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
