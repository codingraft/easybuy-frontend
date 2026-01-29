import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
} from "react-table";

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      pageCount,
      state: { pageIndex },
      previousPage,
      canNextPage,
      canPreviousPage,
    } = useTable(options, useSortBy, usePagination);

    return (
      <div className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 ${containerClassname}`}>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 uppercase tracking-wider">
          {heading}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-slate-200 dark:border-slate-700">
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors first:rounded-tl-lg last:rounded-tr-lg"
                    >
                      <div className="flex items-center gap-2">
                        {column.render("Header")}
                        {column.isSorted && (
                          <span className="text-blue-500">
                            {column.isSortedDesc ? (
                              <AiOutlineSortDescending />
                            ) : (
                              <AiOutlineSortAscending />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors last:border-none"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {showPagination && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              disabled={!canPreviousPage}
              onClick={previousPage}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Prev
            </button>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {`${pageIndex + 1} of ${pageCount}`}
            </span>
            <button
              disabled={!canNextPage}
              onClick={nextPage}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
