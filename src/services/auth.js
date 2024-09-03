import { API } from "../axios/api";
import dataService from "../axios/dataService";
import { errorHandler } from "../helper/handleError";
import { successToast } from "../helper/toast";
import { setToken } from "../store/slice/Base";

export const onSignUpSubmit = async (payload, dispatch, navigate) => {
  try {
    const response = await dataService.post(API.user_signup, payload);
    successToast(response.data.message);
    dispatch(setToken(response.data.data.access_token));
    navigate("/home");
  } catch (error) {
    return errorHandler(error);
  }
};

export const onLogin = async (payload, dispatch, navigate) => {
  try {
    const response = await dataService.post(API.login, payload);
    successToast(response.data.message);
    dispatch(setToken(response.data.data.access_token));
    navigate("/home");
  } catch (error) {
    console.log(" ==>> error", error);
    return errorHandler(error);
  }
};

export const onLogout = async (dispatch, navigate) => {
  try {
    const response = await dataService.delete(API.user_logout);
    successToast(response.data.message);
    dispatch(setToken(""));
    navigate("/");
  } catch (error) {
    return errorHandler(error);
  }
};

export const forgotPassword = async (payload) => {
  try {
    const response = await dataService.post(API.forgot_password, payload);
    successToast(response.data.message);
  } catch (error) {
    return errorHandler(error);
  }
};

export const resetPassword = async (payload) => {
  try {
    const response = await dataService.patch(API.reset_password, payload);
    successToast(response.data.message);
  } catch (error) {
    return errorHandler(error);
  }
};
