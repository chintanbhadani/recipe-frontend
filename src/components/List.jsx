import Table from "../helper/table";
import useTable from "../helper/table/useTable";

const List = () => {
  const {
    data,
    // setData,
    total,
    // setTotal,
    order,
    orderBy,
    isLoading,
    // setIsLoading,
    error,
    // setError,
    rowsPerPage,
    currentPage,
    handleChangeRowsPerPage,
    handleChangePage,
    // queryParams,
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

  return (
    // <div>
    //   <h1>list</h1>
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
      // listHeadCells={itemsListHeadCells}
      // renderRow={renderRow}
      // tableToolbar={TableToolbar}
      noDataIsAvailablePlaceholder={"table.noPropertiesAreAvailable"}
      // confirmationText={t("property.confirmRemoveText")}
      refId="hzScroll"
    />
    // </div>
  );
};

export default List;
