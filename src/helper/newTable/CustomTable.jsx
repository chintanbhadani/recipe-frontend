import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";
import { useEffect, useState } from "react";
import Loading from "../../container/Loading";

const CustomTable = ({
  cols,
  data,
  tableKey,
  loading,
  tableOffset,
  error,
  currentOrder,
  component,
  onSetOrderBy,
}) => {
  const [pagination, setPagination] = useState([tableOffset.page]);

  const onExpandView = (next) => {
    let counter = 1;
    const maxNumberLimit = 3;
    const fromStart = 1;

    if (next) {
      for (
        let i = Math.max(...pagination) + fromStart;
        i <= tableOffset.maxPage;
        i++
      ) {
        if (counter > maxNumberLimit) {
          return;
        } else {
          pagination.push(i);
          setPagination([...pagination]);
        }
        counter++;
      }
    } else {
      for (let i = Math.min(...pagination) - fromStart; i > 0; i--) {
        if (counter > maxNumberLimit) {
          return;
        } else {
          pagination.unshift(i);
          setPagination([...pagination]);
        }
        counter++;
      }
    }
  };

  useEffect(() => {
    if (!pagination.includes(tableOffset.page)) {
      setPagination([tableOffset.page]);
    } else {
      const maxLimit = 3;

      const newArr = pagination.filter((num) => {
        return (
          num < tableOffset.page + maxLimit && num > tableOffset.page - maxLimit
        );
      });

      setPagination([...newArr]);
    }
  }, [tableOffset.page]);

  useEffect(() => {
    setPagination([1]);
  }, [tableOffset.limit]);

  return (
    <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
      <div className="intro-y box p-5 mt-5">
        <div className="flex flex-col sm:flex-row sm:items-end xl:items-start">
          {component}
        </div>
        <div
          id="tabulator"
          className="mt-5 table-report table-report--tabulator tabulator"
          // tabulator-layout="fitColumns"
          style={{ overflow: "auto" }}
        >
          {loading && error === null ? (
            <Loading />
          ) : error !== null ? (
            <div
              className="alert alert-danger mt-6 show flex items-center mb-2"
              role="alert"
            >
              <AlertTriangle className="w-6 h-6 mr-2" /> {error}
            </div>
          ) : data.length === 0 ? (
            <div className="box py-10 sm:py-20 mt-5">
              <div className="font-medium text-center text-lg">
                No data found
              </div>
            </div>
          ) : (
            <>
              <table className="table sm:mt-2">
                <thead>
                  <tr>
                    <>
                      {cols.map((data, i) => (
                        <th
                          className={`${data.sortable && "cursor-pointer"} ${
                            i !== 0 ? "table-col-custom text-center" : ""
                          } ${data.align ? `text-${data.align}` : ""}`}
                          key={data.key}
                          onClick={() =>
                            data.sortable ? onSetOrderBy(data.key, "DESC") : ""
                          }
                        >
                          <div className="tabulator-col-content">
                            <div className="tabulator-col-title-holder">
                              <div className="tabulator-col-title">
                                {data.title}
                              </div>
                            </div>
                            {data.sortable ? (
                              <div
                                className="tabulator-col-sorter"
                                style={{ right: -3 }}
                              >
                                <div
                                  className={
                                    currentOrder?.fieldName === data.key
                                      ? currentOrder.order === "ASC"
                                        ? "arrow-active-asc"
                                        : "arrow-active-desc"
                                      : "tabulator-arrow"
                                  }
                                ></div>
                              </div>
                            ) : null}
                          </div>
                        </th>
                      ))}
                    </>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data, index) => (
                    <tr key={data[tableKey]}>
                      {cols.map((col, key) => (
                        <td
                          key={key}
                          className={`whitespace-nowrap ${
                            key !== 0 ? "text-center" : "font-medium"
                          }`}
                        >
                          {col.render(
                            data,
                            tableOffset.limit * (tableOffset.page - 1) +
                              index +
                              1
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <div className="tabulator-footer">
                <span
                  className="tabulator-paginator"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <label>Page Size</label>
                  <select
                    className="tabulator-page-size"
                    aria-label="Page Size"
                    title="Page Size"
                    defaultValue={tableOffset.limit}
                    onChange={(e) => tableOffset.onSetLimit(+e.target.value)}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                  </select>

                  <div className="hidden md:block mx-auto text-slate-500">
                    Total {tableOffset.total}{" "}
                    {tableOffset.total === 1 ? "record" : "records"}
                  </div>

                  <div className="flex items-center">
                    <button
                      className="tabulator-page page-link"
                      disabled={tableOffset.page === 1}
                      onClick={() => tableOffset.onSetPage(1)}
                    >
                      <ChevronsLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="tabulator-page page-link"
                      disabled={tableOffset.page - 1 <= 0}
                      onClick={() => tableOffset.onPrevious()}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="tabulator-page page-link"
                      disabled={
                        Math.min(...pagination) <= 1 ||
                        pagination.includes(tableOffset.page - 3)
                      }
                      onClick={() => onExpandView(false)}
                    >
                      ...
                    </button>
                    {pagination.map((i) => (
                      <button
                        className={`tabulator-page page-link ${
                          tableOffset.page === i && "active"
                        }`}
                        key={i}
                        onClick={() => tableOffset.onSetPage(i)}
                      >
                        {i}
                      </button>
                    ))}
                    <button
                      className="tabulator-page page-link"
                      disabled={
                        Math.max(...pagination) >= tableOffset.maxPage ||
                        pagination.includes(tableOffset.page + 3)
                      }
                      onClick={() => onExpandView(true)}
                    >
                      ...
                    </button>
                    <button
                      className="tabulator-page page-link"
                      disabled={tableOffset.maxPage <= tableOffset.page}
                      onClick={() => tableOffset.onNext()}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      className="tabulator-page page-link"
                      disabled={tableOffset.maxPage === tableOffset.page}
                      onClick={() => tableOffset.onSetPage(tableOffset.maxPage)}
                    >
                      <ChevronsRight className="w-4 h-4" />
                    </button>
                  </div>
                </span>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
