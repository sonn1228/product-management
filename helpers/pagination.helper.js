module.exports = (req, countItem) => {
  const objPagination = {
    limitItem: parseInt(req.query.limit) || 5,
    currentPage: parseInt(req.query.page) || 1,
    skipItem: 0
  };
  objPagination.skipItem = (objPagination.currentPage - 1) * objPagination.limitItem;

  objPagination.totalPage = Math.ceil(countItem / objPagination.limitItem);
  return objPagination;
}