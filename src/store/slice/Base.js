import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  pagePath: [{ pathName: "Home", href: "/dashboard" }],
  loading: false,
  tableData: {
    page: 1,
    limit: 10,
    maxPage: 1,
    search: null,
    orderBy: null,
    tableFor: null,
    tabFor: "pending",
    metaFilterData: {
      fieldName: null,
    },
  },
};

const baseSlice = createSlice({
  name: "base",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setPagePath: (state, action) => {
      state.pagePath = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
});

export const { setToken, setPagePath, setLoading, setTableData } =
  baseSlice.actions;
export default baseSlice.reducer;
