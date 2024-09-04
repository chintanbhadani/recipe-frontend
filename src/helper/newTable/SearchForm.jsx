import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { setTableData } from "../../store/slice/Base";

const SearchForm = ({ resetSearch, onSearch, searchPlaceHolder }) => {
  const tableOffsetData = useSelector((state) => state.base.tableData);

  const { search } = tableOffsetData;

  const dispatch = useDispatch();

  const onChangeValue = (value) => {
    dispatch(
      setTableData({
        ...tableOffsetData,
        search: value,
      })
    );
  };

  const onSubmit = () => {
    if (search) {
      onSearch(search);
    } else {
      resetSearch();
    }
  };

  const onReset = () => {
    dispatch(
      setTableData({
        ...tableOffsetData,
        search: null,
      })
    );

    resetSearch();
  };

  return (
    <div className="xl:flex sm:mr-auto">
      <div className="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
        <Tooltip id="simpleTooltipSearch" place="top" />
        <input
          name="search"
          type="text"
          onKeyDown={(event) => event.key === "Enter" && onSubmit()}
          autoComplete="off"
          data-tooltip-id="simpleTooltipSearch"
          data-tooltip-content={searchPlaceHolder ?? ""}
          value={search ? search : ""}
          className={"form-control mr-2 sm:w-40 2xl:w-full mt-2 sm:mt-0"}
          placeholder={
            searchPlaceHolder
              ? searchPlaceHolder?.slice(0, 14) + "..."
              : "Search..."
          }
          onChange={(e) => onChangeValue(e.target.value)}
        />
      </div>
      <div className="mt-2 xl:mt-0">
        <button
          type="submit"
          className="btn btn-primary w-full sm:w-16"
          onClick={() => onSubmit()}
        >
          Go
        </button>
        <button
          type="reset"
          className="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-2"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
