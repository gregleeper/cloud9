import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        className="px-4 py-2 border-gray-400 shadow"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      className="px-2 py-1 border shadow-sm round-sm"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headers,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        sortBy: [
          {
            id: "createdAt",
            desc: true,
          },
        ],
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <table
        {...getTableProps()}
        className="bg-gray-100 text-gray-900 border shadow p-4 mt-8 w-full text-sm"
      >
        <thead className=" border-b-2 border-gray-400 ">
          {headers.map((column) => (
            <th
              className="px-4 py-2 "
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              <div className="flex justify-center items-center">
                {column.render("Header")}
                <div>
                  <span className="text-lg text-gray-700 ">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <IoMdArrowDropdownCircle />
                      ) : (
                        <IoMdArrowDropupCircle />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </div>
              <div>{column.canFilter ? column.render("Filter") : null}</div>
            </th>
          ))}
        </thead>
        <tbody className="" {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            console.log(row);
            return (
              <tr className="border-b border-gray-400" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="py-5 px-4" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
