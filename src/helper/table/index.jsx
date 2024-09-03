import { ROWS_PER_PAGE_OPTIONS } from "../../constant";
import { Button, PageButton } from "../../shared/Button";
import TableHead from "./TableHead";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const Table = ({
  data,
  listHeadCells,
  renderRow,
  onRowsPerPageChange,
  onPageChange,
  rowsPerPage,
  currentPage,
  total,
  isLoading,
}) => {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Excel Data</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              {<TableHead listHeadCells={listHeadCells}></TableHead>}
              {isLoading ? (
                <tr>
                  <td colSpan={listHeadCells.length}>
                    <div
                      role="status"
                      className="h-screen flex justify-center items-center"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ) : (
                <tbody>
                  {data &&
                    data?.map((row, index) => {
                      return <tr key={index}>{renderRow(row)}</tr>;
                    })}
                </tbody>
              )}
            </table>
          </div>
        </div>
        {/* pagination  */}
        {data && data.length > 0 && !isLoading && !!total && (
          <div className="py-3 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button>Previous</Button>
              <Button>Next</Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div className="flex gap-x-2 items-baseline">
                <span className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage + 1}</span> of{" "}
                  <span className="font-medium">
                    {Math.ceil(total / rowsPerPage)}
                  </span>
                </span>
                <label>
                  <span className="sr-only">Items Per Page</span>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={rowsPerPage}
                    onChange={(e) => {
                      onRowsPerPageChange(e);
                    }}
                  >
                    {ROWS_PER_PAGE_OPTIONS.map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <PageButton
                    className="rounded-l-md"
                    onClick={() => onPageChange(0)}
                  >
                    <span className="sr-only">First</span>
                    <ChevronDoubleLeftIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    onClick={() =>
                      onPageChange(currentPage > 0 ? currentPage - 1 : 0)
                    }
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    onClick={() =>
                      onPageChange(
                        currentPage * rowsPerPage < total
                          ? currentPage + 1
                          : currentPage
                      )
                    }
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    className="rounded-r-md"
                    onClick={() => onPageChange(total / rowsPerPage - 1)}
                  >
                    <span className="sr-only">Last</span>
                    <ChevronDoubleRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </PageButton>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
