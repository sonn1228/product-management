const ProductCategory = require('../models/productCategory.model');


const getSubCategory = async (parent_id) => {
  let allSubs = [];

  const listSub = await ProductCategory.find({
    parent_id: parent_id,
    deleted: false,
    status: "active"
  }).select("id title");

  allSubs = [...listSub];

  for (const sub of listSub) {
    const childs = await getSubCategory(sub.id);
    allSubs = allSubs.concat(childs);
  }

  return allSubs;
};
module.exports.getSubCategory = getSubCategory