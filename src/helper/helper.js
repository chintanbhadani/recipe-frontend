import moment from "moment";
import { errorToast } from "./toast";

export const handleCatchResponse = (error) => {
  const message = "Something is wrong please try again!";

  for (const key in error) {
    if (key === "request") {
      if (error[key].status === 401) {
        localStorage.removeItem("Token");
        window.location.reload();
      }
      const responseMessage = JSON.parse(error[key].response);
      errorToast(responseMessage.message);
      return;
    }
  }
  errorToast(message);
};

export const handleErrorForFetch = async (error, setError) => {
  let message = "Something went wrong!";
  for (const key in error) {
    if (key === "request") {
      if (error[key].status === 401) {
        localStorage.removeItem("Token");
        window.location.reload();
      }
      const responseMessage = await JSON.parse(
        JSON.stringify(error[key].response)
      );
      message = responseMessage.message ?? "Something went wrong!";
    }
  }
  setError(message);
};

export const checkAdminAuth = () => {
  const token = localStorage.getItem("Token");
  return Boolean(token);
};

export const serializeQueryParams = (payload) => {
  if (typeof payload === "object") {
    const queryParams = new URLSearchParams();

    for (const key in payload) {
      queryParams.append(key, payload[key]);
    }

    return queryParams.toString();
  } else {
    const urlParams = new URLSearchParams(payload);
    const params = Object.fromEntries(urlParams);
    return params;
  }
};

export function maxWeekDay(daysArray) {
  let maxDay = null;
  let maxIndex = -1;

  for (let i = 0; i < daysArray.length; i++) {
    const day = daysArray[i];
    const dayIndex = moment().day(day).weekday();

    if (maxDay === null || dayIndex > maxIndex) {
      maxDay = day;
      maxIndex = dayIndex;
    }
  }

  return maxDay;
}

export function getDate(date, targetDay) {
  const year = moment(date).year();
  const week = moment(date).week();
  const getDate = moment()
    .year(year)
    .week(week)
    .day(targetDay)
    .format("DD/MM/YYYY");

  return getDate;
}

// export const validateNumber = (
//   value: string,
//   fieldName: string,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   setFieldValue: (
//     field: string,
//     value: any,
//     shouldValidate?: boolean | undefined
//   ) => void
// ) => {
//   const reg = /^\d+$/;
//   if (reg.test(value)) setFieldValue(fieldName, value);
//   else if (!value) setFieldValue(fieldName, "");
// };

// /**
//  * @description This function is used increase z-index of date picker
//  * @returns updated z-index
//  */
// export const onDatePickerOpen = (
//   setZIndex: React.Dispatch<SetStateAction<ZIndexMaintainer>>,
//   fieldName: string
// ) => {
//   return () => {
//     setZIndex((o) => ({ ...o, [fieldName]: "100" }));
//   };
// };

// /**
//  * @description This function is used reset z-index of date picker
//  * @returns updated z-index
//  */
// export const onDatePickerClose = (
//   setZIndex: React.Dispatch<SetStateAction<ZIndexMaintainer>>,
//   fieldName: string
// ) => {
//   return () => {
//     setZIndex((o) => ({ ...o, [fieldName]: undefined }));
//   };
// };
