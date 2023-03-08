const { USER_TYPES, USER_ROUTES } = require("./constants");

const checkDateFormat = (inputDate) => {
  if (!inputDate) {
    return true;
  } else {
    return checkDateFormatYYYYMMDD || checkDateFormatYYYYMMYYHHMM;
  }
};

const checkIfEmail = (input) => {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return input.match(emailPattern) ? true : false;
};

const checkPasswordPattern = (input) => {
  if (!input || input.length < 8) {
    return false;
  } else {
    return true;
  }
};

const checkType = (input) => {
  const validType = USER_TYPES.filter((t) => t.toLowerCase() === input.toLowerCase());
  if (!validType || validType.length === 0) return false;
  return true;
};

const getUserInfoAfterLogin = (id, username, name) => {
  return {
    id,
    username,
    name,
  };
};

const checkDateFormatYYYYMMDD = (dateVal) => {
  const validatePattern = "/^(d{4})(/|-)(d{1,2})(/|-)(d{1,2})$/"; // yyyy/mm/dd

  dateValues = dateVal.match(validatePattern);

  if (dateValues == null) return false;

  let dtYear = dateValues[1];
  dtMonth = dateValues[3];
  dtDay = dateValues[5];

  if (dtMonth < 1 || dtMonth > 12) return false;
  else if (dtDay < 1 || dtDay > 31) return false;
  else if (
    (dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) &&
    dtDay == 31
  )
    return false;
  else if (dtMonth == 2) {
    var isleap = dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0);
    if (dtDay > 29 || (dtDay == 29 && !isleap)) return false;
  }

  return true;
};

const checkDateFormatYYYYMMYYHHMM = (inputDate) => {
  const myRegExp = /^\d{4}-[0-1][0-2]-[0-3]\d\s([0-1][0-9]|2[0-3]):[0-5]\d$/;
  if (inputDate.match(myRegExp)) {
    return true;
  }
  return false;
};

const compareArrays = (a, b) => {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

const fromStrToNumber = (str) => {
  return Number(str);
};

const hasUserRoute = (url) => {
  const routes = USER_ROUTES.filter((r) => r === url);
  const usersRoute = routes.length === 0 && url.startsWith("/users");
  const hasAccess = routes.length > 0 || usersRoute;
  if (!hasAccess) {
    return false;
  }
  return true;
};

module.exports = {
  checkDateFormat,
  checkIfEmail,
  checkPasswordPattern,
  checkType,
  getUserInfoAfterLogin,
  compareArrays,
  fromStrToNumber,
  hasUserRoute,
};
