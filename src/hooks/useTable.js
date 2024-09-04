import { useCallback, useEffect, useState } from "react";
import { serializeQueryParams } from "../helper/helper";
import { useDispatch, useSelector } from "react-redux";
// import { setTableData } from "../store/slice/BaseSlice";
import { useParams } from "react-router-dom";
// import useFetch from "./useFetch";
import { setTableData } from "../store/slice/Base";
import useFetch from "./useFetch";

const useTable = (tableFor, url, strict, params) => {
  const dispatch = useDispatch();

  const { pageType = "" } = useParams();
  const [lParams, setLParams] = useState(params);

  const tableOffsetData = useSelector((state) => state.base.tableData ?? {});

  console.log("tableOffsetData  :: ", tableOffsetData);

  const { search, page, limit, maxPage, orderBy } = tableOffsetData;

  let payloadForReload = {
    limit,
    page,
  };

  if (search) {
    payloadForReload.search = search;
  }

  if (orderBy) {
    payloadForReload.fieldName = orderBy.fieldName;
    payloadForReload.order = orderBy.order;
  }

  if (tableOffsetData.metaFilter) {
    payloadForReload = {
      ...payloadForReload,
      ...tableOffsetData.metaFilter,
    };
  }

  const initialTableData = {
    page: 1,
    limit: 10,
    maxPage: 1,
    search: null,
    orderBy: null,
    tableFor,
    tabFor: pageType,
    // metaFilterData: {
    //   fieldName,
    // },
  };

  if (tableOffsetData.tableFor !== tableFor) {
    payloadForReload = { limit: 10, page: 1 };
  }

  const queryParam = strict ? "&" : "?";

  const { loading, res, fetchApi, error } = useFetch(
    `${url}${queryParam}${serializeQueryParams({
      ...payloadForReload,
      ...lParams,
    })}`
  );

  //   console.log("res  :: ", res);

  const dataValues = res ?? null;

  const total = res?.metaData?.total ?? 0;

  useEffect(() => {
    if (tableOffsetData.tableFor !== tableFor) {
      dispatch(
        setTableData({
          ...initialTableData,
          maxPage: Math.max(Math.ceil(total / limit), 1),
        })
      );
    } else {
      dispatch(
        setTableData({
          ...tableOffsetData,
          maxPage: Math.max(Math.ceil(total / limit), 1),
        })
      );
    }
  }, [total, limit]);

  const onChangePageOrLimit = useCallback(
    (pageNum, limitNum) => {
      let payload = {
        page: pageNum,
        limit: limitNum,
        ...lParams,
      };

      if (tableOffsetData.metaFilter) {
        payload = {
          ...payload,
          ...tableOffsetData.metaFilter,
        };
      }

      if (search) {
        payload.search = search;
      }
      if (orderBy) {
        payload.order = orderBy.order;
        payload.fieldName = orderBy.fieldName;
      }

      fetchApi(`${url}${queryParam}${serializeQueryParams(payload)}`);
    },
    [search, orderBy, url, tableOffsetData, lParams]
  );

  const onNext = useCallback(() => {
    const updatedPage = Math.min(page + 1, maxPage);

    dispatch(
      setTableData({
        ...tableOffsetData,
        page: updatedPage,
      })
    );
    onChangePageOrLimit(updatedPage, limit);
  }, [search, orderBy, page, maxPage, limit, onChangePageOrLimit]);

  const onPrevious = useCallback(() => {
    const updatedPage = Math.max(page - 1, 1);
    dispatch(
      setTableData({
        ...tableOffsetData,
        page: updatedPage,
      })
    );
    onChangePageOrLimit(updatedPage, limit);
  }, [search, orderBy, page, maxPage, limit, onChangePageOrLimit]);

  const onSetPage = useCallback(
    (pageNum) => {
      dispatch(
        setTableData({
          ...tableOffsetData,
          page: pageNum,
        })
      );
      onChangePageOrLimit(pageNum, limit);
    },
    [search, limit, maxPage, orderBy, onChangePageOrLimit]
  );

  const onSearch = useCallback(
    (value = "", metaFilter) => {
      if (value) {
        dispatch(
          setTableData({
            ...tableOffsetData,
            page: 1,
            search: value,
          })
        );
      } else {
        dispatch(
          setTableData({
            ...tableOffsetData,
            search: "",
            page: 1,
            metaFilter,
            metaFilterData: metaFilter,
          })
        );
      }

      let payload = {
        limit,
        page: 1,
      };

      if (!value) {
        payload = { ...payload, ...metaFilter };
      } else {
        payload.search = value;
      }

      if (orderBy) {
        payload.order = orderBy.order;
        payload.fieldName = orderBy.fieldName;
      }

      fetchApi(
        `${url}${queryParam}${serializeQueryParams({ ...lParams, ...payload })}`
      );
    },
    [page, total, limit, search, orderBy, url, lParams]
  );

  const resetSearch = useCallback(() => {
    dispatch(
      setTableData({
        ...tableOffsetData,
        metaFilter: null,
        page: 1,
        search: null,
        limit: 10,
      })
    );

    const payload = {
      limit: 10,
      page: 1,
    };

    if (orderBy) {
      payload.fieldName = orderBy.fieldName;
      payload.order = orderBy.order;
    }

    fetchApi(
      `${url}${queryParam}${serializeQueryParams({ ...payload, ...lParams })}`
    );
  }, [orderBy, url, tableOffsetData, queryParam]);

  const onSetOrderBy = useCallback(
    (fieldName, newOrderBy) => {
      const newOrder = {
        fieldName,
        order: newOrderBy,
      };

      if (newOrder.fieldName === orderBy?.fieldName) {
        newOrder.order = orderBy.order === "ASC" ? "DESC" : "ASC";
      }

      dispatch(
        setTableData({
          ...tableOffsetData,
          orderBy: newOrder,
          page: 1,
        })
      );

      const payload = {
        limit,
        page: 1,
        fieldName: newOrder.fieldName,
        order: newOrder.order,
      };

      if (search) {
        payload.search = search;
      }

      fetchApi(
        `${url}${queryParam}${serializeQueryParams({ ...payload, ...lParams })}`
      );
    },
    [search, page, limit, maxPage, orderBy, onChangePageOrLimit, url, lParams]
  );

  const onSetLimit = useCallback(
    (limitNum) => {
      const data = {
        ...tableOffsetData,
        page: 1,
        limit: limitNum,
      };

      dispatch(setTableData(data));
      onChangePageOrLimit(1, limitNum);
    },
    [search, maxPage, orderBy, onChangePageOrLimit]
  );

  const currentOrder = orderBy;

  const tableOffset = {
    onNext,
    onPrevious,
    onSetPage,
    onSetLimit,
    total,
    limit,
    page,
    maxPage,
  };

  return {
    tableData: dataValues,
    loading,
    fetchApi,
    tableOffset,
    error,
    onSearch,
    onSetOrderBy,
    resetSearch,
    currentOrder,
    setLParams,
    res,
  };
};

export default useTable;
