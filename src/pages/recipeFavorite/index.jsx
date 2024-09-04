import { API } from "../../axios/api";
import CustomTable from "../../helper/newTable/CustomTable";
import useTable from "../../hooks/useTable";

const RecipeFavList = () => {
  const recipeFavTable = useTable("recipeFavorite", API.getFavorite, false);

  const recipeFavCols = [
    {
      title: "#",
      key: "id",
      render: (record, srNo) => {
        return <span>{srNo}</span>;
      },
    },
    {
      title: "NAME",
      key: "name",
      sortable: false,
      render: (record) => {
        return <span>{record?.recipeName}</span>;
      },
    },
    {
      title: "INGREDIENTS",
      key: "ingredients",
      sortable: false,
      render: (record) => {
        const ingredients = record?.ingredients.join(", ");
        return <span>{ingredients}</span>;
      },
    },
    {
      title: "IMAGE",
      key: "imaage",
      sortable: false,
      render: (record) => {
        // Display the image using the img tag
        return (
          <img
            src={
              record?.image ||
              "https://img.spoonacular.com/recipes/663559-312x231.jpg"
            } // Use a default image or record image
            alt={record?.job?.centreForJob?.centreName || "Image"} // Provide a meaningful alt text
            style={{ width: "100px", height: "auto" }} // Adjust the size as needed
          />
        );
      },
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <CustomTable
          cols={recipeFavCols}
          data={recipeFavTable?.res?.data ?? []}
          tableKey="id"
          reload={recipeFavTable.fetchApi}
          currentOrder={recipeFavTable.currentOrder}
          error={recipeFavTable.error}
          loading={recipeFavTable.loading}
          tableOffset={recipeFavTable.tableOffset}
          onSetOrderBy={recipeFavTable.onSetOrderBy}
        />
      </div>
    </>
  );
};

export default RecipeFavList;
