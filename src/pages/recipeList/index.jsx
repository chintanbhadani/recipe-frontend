/* eslint-disable indent */
// import { AlertTriangle, Edit, Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../axios/api";
import CustomTable from "../../helper/newTable/CustomTable";
import useTable from "../../hooks/useTable";

const initialValue = {
  //   fieldName: TimesheetFormFields.scheduler,
  schedulerId: null,
  relieverId: null,
  centreId: null,
  startDate: null,
  endDate: null,
};

const RecipeList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeSheet, setTimeSheet] = useState(null);

  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.base.tableData);

  const navigate = useNavigate();
  //   usePathName([{ pathName: "Timesheet", href: "/timesheet" }]);

  const jobTimeTable = useTable("relieverJobHours", API.recipe, false, {
    apiKey: "baf2d6aaa0b34d3fba0adcd5d6642c30",
    ingredients: "carrots,tomatoes",
  });

  //   const availableRelieverTable =
  //     useTable <
  //     AvailableRelieverTableInterface >
  //     ("availableReliever",
  //     `${api.admin.getRelieverList}`,
  //     false,
  //     {
  //       date,
  //       status,
  //       positionId: position?.positionId ?? "",
  //     });

  console.log("jobTimeTable", jobTimeTable);

  //   const onDeleteClick = useCallback((record) => {
  //     setTimeSheet(record);
  //     setIsOpen(true);
  //   }, []);

  //   const onDelete = () => {
  //     if (timeSheet?.id) {
  //       onDeleteTimeSheet(timeSheet.id, dispatch, jobTimeTable.fetchApi);
  //       setIsOpen(false);
  //     }
  //   };

  const jobTimeCols = [
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
        return <span>{record?.title}</span>;
      },
    },
    {
      title: "INGREDIENTS",
      key: "ingredients",
      sortable: false,
      render: (record) => {
        const ingredients = record?.usedIngredients
          ?.map((ingredient) => ingredient.name)
          .join(", ");
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

  //   const handleCancel = () => {
  //     setIsOpen(false);
  //   };

  //   const onTimesheetSubmit = (values) => {
  //     // const metaFilters = {};
  //     // if (values.schedulerId) metaFilters.schedulerId = values?.schedulerId;
  //     // if (values.centreId) metaFilters.centreId = values?.centreId;
  //     // if (values.relieverId) metaFilters.relieverId = values?.relieverId;
  //     // if (values?.startDate) metaFilters.startDate = moment(values.startDate)?.startOf("day").toISOString();
  //     // if (values?.endDate) metaFilters.endDate = moment(values.endDate)?.endOf("day").toISOString();
  //     // dispatch(
  //     //     setTableData({ ...tableData, metaFilter: metaFilters as MetaFilterInterface, metaFilterData: values as MetaFilterInterface })
  //     // );
  //     // jobTimeTable.onSearch<MetaFilterInterface>("", metaFilters as MetaFilterInterface);
  //   };

  return (
    <>
      {/* <DeleteModal
        handleCancel={handleCancel}
        isOpen={isOpen}
        onDelete={onDelete}
        subTitle="Do you really want to delete this position?"
      /> */}
      <div className="grid grid-cols-12 gap-6 mt-5">
        <CustomTable
          cols={jobTimeCols}
          data={jobTimeTable.tableData ?? []}
          tableKey="id"
          reload={jobTimeTable.fetchApi}
          currentOrder={jobTimeTable.currentOrder}
          error={jobTimeTable.error}
          loading={jobTimeTable.loading}
          tableOffset={jobTimeTable.tableOffset}
          onSetOrderBy={jobTimeTable.onSetOrderBy}
          component={
            <>
              {/* <SearchForm
                                resetSearch={jobTimeTable.resetSearch}
                                onSearch={jobTimeTable.onSearch}
                                searchPlaceHolder="Search by name or email"
                            /> */}

              {/* <Formik
                initialValues={initialValue}
                enableReinitialize
                onSubmit={onTimesheetSubmit}
                validationSchema={timeSheetFilterValidation}
              >
                {(props) => <TimeSheetForm {...props} />}
              </Formik> */}
            </>
          }
        />
      </div>
    </>
  );
};

export default RecipeList;
