import { useCallback, useEffect, useState } from "react";
import Table from "../../helper/table";
import useTable from "../../helper/table/useTable";
import { itemsListHeadCells } from "./util";
import { errorHandler } from "../../helper/handleError";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import ConfirmDelete from "./DeleteModal";
import { getUser } from "../../services/user";

const PageList = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const {
    data,
    setData,
    total,
    setTotal,
    order,
    orderBy,
    isLoading,
    setIsLoading,
    error,
    // setError,
    rowsPerPage,
    currentPage,
    handleChangeRowsPerPage,
    handleChangePage,
    queryParams,
    // handleCellClick,
    isConfirmToRemoveModalOpen,
    // rowToDelete,
    handleConfirmToRemoveModalClose,
    // openConfirmToRemoveModal,
    handleSortChange,
    handleSelectAllClick,
    // handleTableSearch,
    // handleDeleteLastPageData,
  } = useTable({
    loading: true,
  });

  const renderRow = useCallback((row) => {
    return (
      <>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10">
              <img
                className="w-full h-full rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-gray-900 whitespace-no-wrap">
                {row?.first_name} {row?.last_name}
              </p>
              <p className="text-gray-600 whitespace-no-wrap">{row?.email}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">$20,000</p>
          <p className="text-gray-600 whitespace-no-wrap">USD</p>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
          <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
            ></span>
            <span className="relative">Paid</span>
          </span>
        </td>
        <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
          <button
            type="button"
            className="inline-block text-gray-500 hover:text-gray-700"
          >
            <div className="flex gap-1">
              <PencilSquareIcon className="h-5 w-5" />
              <TrashIcon
                className="h-5 w-5"
                onClick={() => {
                  setIsOpenDeleteModal(!isOpenDeleteModal);
                }}
              />
            </div>
          </button>
        </td>
      </>
    );
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getUser(queryParams);
      const { data } = response;
      setData(data.users);
      setTotal(data.total_users);
    } catch (error) {
      console.log(error);
      errorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchData();
  }, [queryParams]);

  return (
    <>
      <Table
        data={data}
        total={total}
        currentPage={currentPage}
        order={order}
        orderBy={orderBy}
        error={error}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        // onRowRemove={handleRowRemove}
        onSortChange={handleSortChange}
        onSelectAllClick={handleSelectAllClick}
        onConfirmToRemoveModalClose={handleConfirmToRemoveModalClose}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        isConfirmToRemoveModalOpen={isConfirmToRemoveModalOpen}
        listHeadCells={itemsListHeadCells}
        renderRow={renderRow}
        // tableToolbar={TableToolbar}
        noDataIsAvailablePlaceholder={"table.noPropertiesAreAvailable"}
        // confirmationText={t("property.confirmRemoveText")}
        refId="hzScroll"
      />
      {
        <ConfirmDelete
          open={isOpenDeleteModal}
          setOpen={setIsOpenDeleteModal}
        />
      }
    </>
  );
};

export default PageList;
