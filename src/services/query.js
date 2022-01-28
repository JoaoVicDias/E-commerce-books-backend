const treatsOrderBy = (orderByArrayJson) => {
  return JSON.parse(orderByArrayJson).map((order) => order.split(" "));
};

module.exports = { treatsOrderBy };
