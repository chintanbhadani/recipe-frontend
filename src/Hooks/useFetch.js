import { useEffect, useState } from "react";
// import { dataService } from "../config/DataService";
import { handleErrorForFetch } from "../helper/helper";
import dataService from "../axios/dataService";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState();
  const [error, setError] = useState(null);

  const fetchApi = (updatedUrl) => {
    setLoading(true);
    dataService
      .get(updatedUrl ? updatedUrl : url)
      .then((response) => {
        return response.data;
      })
      .then((json) => {
        setLoading(false);
        setRes(json);
      })
      .catch((error) => {
        handleErrorForFetch(error, setError);
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, res, fetchApi, error };
};

export default useFetch;
