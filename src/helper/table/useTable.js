import { useCallback, useEffect, useState } from "react";
import { objectGetParamsToString } from "../../utils/common";
import { STARTING_PAGE } from "../../constant";

const useTable = () => {
  const [queryParams, setQueryParams] = useState("");
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(STARTING_PAGE);
  //   const [rowToDelete, setRowToDelete] = useState(null);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("");
  const [search, setSearch] = useState("");
  //   const [isConfirmToRemoveModalOpen, setIsConfirmToRemoveModalOpen] =
  //     useState(false);

  useEffect(() => {
    const params = objectGetParamsToString(
      mapTableGetParams({
        orderBy,
        order,
        currentPage,
        search,
        rowsPerPage,
      })
    );
    setQueryParams(params && `?${params}`);
  }, [orderBy, order, currentPage, search, rowsPerPage]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(STARTING_PAGE);
  };

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const mapTableGetParams = useCallback((o) => {
    const a = {};
    if (o["currentPage"]) a["page"] = o["currentPage"] + 1;
    if (o["currentPage"]) a["offset"] = o["currentPage"] * o["rowsPerPage"];
    if (o["order"]) a["order"] = o["order"];
    if (o["orderBy"]) a["sort"] = o["orderBy"];
    if (o["rowsPerPage"]) a["limit"] = o["rowsPerPage"];
    if (o["search"]) a["search"] = o["search"];
    return a;
  }, []);

  return {
    data,
    setData,
    total,
    setTotal,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    isLoading,
    setIsLoading,
    error,
    setError,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    setCurrentPage,
    handleChangeRowsPerPage,
    handleChangePage,
    // handleCellClick,
    // isConfirmToRemoveModalOpen,
    // handleConfirmToRemoveModalClose,
    // openConfirmToRemoveModal,
    // rowToDelete,
    // handleSortChange,
    setSearch,
    queryParams,
    setQueryParams,
    // handleTableSearch,
    // handleDeleteLastPageData,
  };
};

export default useTable;
