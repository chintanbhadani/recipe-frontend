import { API } from "../axios/api";
import dataService from "../axios/dataService";
import { errorHandler } from "../helper/handleError";
import { successToast } from "../helper/toast";
import { setToken } from "../store/slice/Base";
import axios from "axios";

// export const getUser = async (payload, dispatch) => {
//   try {
//     const response = await dataService.post(API.signup, payload);
//     successToast(response.data.message);
//     dispatch(setToken(response.data.data.token));
//   } catch (error) {
//     return errorHandler(error);
//   }
// };

export const getUser = async (params) => {
  return await axios.get(API.user + params);
};
