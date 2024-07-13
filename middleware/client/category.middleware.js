const ProductCategory = require("../../models/productCategory.model");

const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.category = async (req, res, next) => {
  const productCategory = await ProductCategory.find({
    deleted: false,
    status: "active"
  });

  const newProductCategory = createTreeHelper(productCategory);

  res.locals.layoutProductCategory = newProductCategory;

  next();
}