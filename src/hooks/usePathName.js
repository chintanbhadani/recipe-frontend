import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPagePath } from "../store/slice/BaseSlice";

const usePathName = (props) => {
  const dispatch = useDispatch();

  const onSetPage = useCallback(() => {
    dispatch(setPagePath(props));
  }, [props]);

  useEffect(() => {
    onSetPage();
  }, []);

  return { onSetPage };
};

export default usePathName;
