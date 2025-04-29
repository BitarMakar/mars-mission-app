const isUndefinedOrNullOrEmpty = (...values) => {
  return values.some(
    (value) => value === undefined || value === null || value === ""
  );
};

const isUndefinedOrNull = (...values) => {
  return values.some((value) => value === undefined || value === null);
};

module.exports = {
  isUndefinedOrNullOrEmpty,
  isUndefinedOrNull,
};
