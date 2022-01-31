const treatsOrderBy = (orderByArrayJson) => {
  if(!orderByArrayJson) return []
  return JSON.parse(orderByArrayJson).map((order) => order.split(" "));
};

const treatesPagination = (offset = 0, limit = 10) => {
  return {
    offset: Number(offset),
    limit: Number(limit),
  };
};

module.exports = { treatsOrderBy, treatesPagination };
