const TableHead = ({ listHeadCells }) => {
  return (
    <>
      <thead>
        <tr>
          {listHeadCells.map((headCell) => {
            return (
              <th
                key={headCell.id}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                {headCell.label}
              </th>
            );
          })}
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
