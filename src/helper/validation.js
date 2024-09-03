import * as Yup from "yup";

const validateString = Yup.string().trim();

export const userSignUpValidation = Yup.object({
  email: validateString.email("Email is invalid").required("Email is reqiured"),
  password: validateString.min(8).required().label("password"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("confirm_password"),
  name: validateString.required("Name is reqiured") 
});

export const onLoginValidation = Yup.object({
  email: validateString.email("Email is invalid").required("Email is reqiured"),
  password: validateString.min(8).required().label("Password"),
});

export const forgotPasswordValidation = Yup.object({
  email: validateString.email("Email is invalid").required("Email is reqiured"),
});

export const resetPasswordValidation = Yup.object({
  password: validateString.min(8).required().label("password"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("confirm_password"),
});

export const restaurantSignUpValidation = Yup.object({
  email: validateString.email("Email is invalid").required("Email is reqiured"),
  password: validateString.min(8).required().label("password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("confirm_password"),
});

export const restaurantSignUpValidationStep2 = Yup.object({
  name: validateString.required("Name is reqiured"),
});
