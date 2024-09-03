import { useState } from "react";
import Table from "../../helper/table";
import useTable from "../../helper/table/useTable";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { parseCellReference } from "./util";

const ExcelDataList = () => {
  const {
    data,
    setData,
    total,
    order,
    orderBy,
    isLoading,
    error,
    rowsPerPage,
    currentPage,
    handleChangeRowsPerPage,
    handleChangePage,
    isConfirmToRemoveModalOpen,
    handleConfirmToRemoveModalClose,
    handleSortChange,
    handleSelectAllClick,
  } = useTable({
    loading: true,
  });

  const [listHeadCells, setListHeadCells] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [cellStart, setCellStart] = useState("");
  const [cellEnd, setCellEnd] = useState("");
  const [operation, setOperation] = useState("");
  const [workbook, setWorkbook] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.name.split(".").pop();

      if (fileType === "xlsx") {
        // Handle Excel files
        const reader = new FileReader();
        reader.onload = (event) => {
          const binaryStr = event.target.result;
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          setWorkbook(workbook);

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const headers = jsonData[0];
          setHeaders(headers);
          const dataRows = jsonData.slice(1);

          const dynamicHeaders = headers.map((header) => ({
            id: header,
            label: header.charAt(0).toUpperCase() + header.slice(1),
          }));
          setListHeadCells(dynamicHeaders);

          setData(dataRows);
        };
        reader.readAsBinaryString(file);
      } else if (fileType === "csv") {
        // Handle CSV files
        setWorkbook(null);
        Papa.parse(file, {
          complete: (result) => {
            const headers = result.data[0];
            const dataRows = result.data.slice(1);
            setHeaders(headers);

            const dynamicHeaders = headers.map((header) => ({
              id: header,
              label: header.charAt(0).toUpperCase() + header.slice(1),
            }));
            setListHeadCells(dynamicHeaders);
            setData(dataRows);
          },
        });
      }
    }
  };

  const handleApplyOperation = () => {
    if (!data || !cellStart || !cellEnd || !operation) return;
  
    const startCell = parseCellReference(cellStart);
    const endCell = parseCellReference(cellEnd);
  
    if (!startCell || !endCell) {
      alert("Invalid cell reference");
      return;
    }
  
    const updatedData = [...data];
  
    for (let rowIndex = startCell.row; rowIndex <= endCell.row; rowIndex++) {
      const row = updatedData[rowIndex];
  
      if (!row) continue;
  
      for (let colIndex = startCell.col; colIndex <= endCell.col; colIndex++) {
        const columnKey = Object.keys(row)[colIndex];
        if (columnKey && row[columnKey]) {
          if (typeof row[columnKey] === "string") {
            row[columnKey] =
              operation === "uppercase"
                ? row[columnKey].toUpperCase()
                : row[columnKey].toLowerCase();
          } else {
            console.warn(`Cell at row ${rowIndex + 1}, column ${columnKey} is not a string.`);
          }
        }
      }
    }    
  
    setData(updatedData);
  };
  

  // Render CSV data in table
  const renderRow = (row) => {
    return Object.keys(row).map((key, index) => (
      <td
        key={index}
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
      >
        {row[key]}
      </td>
    ));
  };

  const handleDownload = () => {
    if (!data) return;

    if (workbook) {
      // For Excel files
      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
      const newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, worksheet, "Sheet1");
      XLSX.writeFile(newWorkbook, "updated_data.xlsx");
    } else {
      // For CSV files
      const csv = Papa.unparse([headers, ...data]);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "updated_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Cell Start (e.g., A2):
        </label>
        <input
          type="text"
          value={cellStart}
          onChange={(e) => setCellStart(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label className="block text-sm font-medium text-gray-700 mt-2">
          Cell End (e.g., C5):
        </label>
        <input
          type="text"
          value={cellEnd}
          onChange={(e) => setCellEnd(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label className="block text-sm font-medium text-gray-700 mt-2">
          Operation:
        </label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select Operation</option>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
        </select>
        <button
          onClick={handleApplyOperation}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply Operation
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Download Updated CSV
        </button>
      </div>

      <Table
        data={data}
        total={total}
        currentPage={currentPage}
        order={order}
        orderBy={orderBy}
        error={error}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
        onSortChange={handleSortChange}
        onSelectAllClick={handleSelectAllClick}
        onConfirmToRemoveModalClose={handleConfirmToRemoveModalClose}
        rowsPerPage={rowsPerPage}
        isLoading={isLoading}
        isConfirmToRemoveModalOpen={isConfirmToRemoveModalOpen}
        listHeadCells={listHeadCells}
        renderRow={renderRow}
        noDataIsAvailablePlaceholder={"table.noPropertiesAreAvailable"}
        refId="hzScroll"
      />
    </>
  );
};

export default ExcelDataList;
