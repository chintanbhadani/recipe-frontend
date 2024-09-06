import { API } from "../../axios/api";
import CustomTable from "../../helper/newTable/CustomTable";
import useTable from "../../hooks/useTable";
import { useParams } from "react-router-dom";

const RatingList = () => {
  const { id } = useParams(); // Get the recipe ID from the URL

  // Fetch ratings data from API
  const ratingsTable = useTable("ratings", `${API.getRating}/${id}`, false);

  const ratingColumns = [
    {
      title: "#",
      key: "id",
      render: (record, srNo) => <span>{srNo}</span>,
    },
    {
      title: "Rating",
      key: "rating",
      sortable: false,
      render: (record) => <span>{record?.rating}</span>,
    },
    {
      title: "Comment",
      key: "comment",
      sortable: false,
      render: (record) => <span>{record?.comment || "No comment"}</span>,
    }
  ];

  return (
    <div className="grid grid-cols-12 gap-6 mt-5">
      <CustomTable
        cols={ratingColumns}
        data={ratingsTable?.tableData?.data ?? []}
        tableKey="id"
        reload={ratingsTable.fetchApi}
        currentOrder={ratingsTable.currentOrder}
        error={ratingsTable.error}
        loading={ratingsTable.loading}
        tableOffset={ratingsTable.tableOffset}
        onSetOrderBy={ratingsTable.onSetOrderBy}
      />
    </div>
  );
};

export default RatingList;
