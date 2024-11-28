import ProductCategory from "../../models/productCategory.model.js";
import createTreeHelper from "../../helpers/createTree.helper.js";
class CategoryMiddleware {

  category = async (req, res, next) => {
    const productCategory = await ProductCategory.find({
      deleted: false,
      status: "active"
    });

    const newProductCategory = createTreeHelper(productCategory);

    res.locals.layoutProductCategory = newProductCategory;

    next();
  }
}
export default new CategoryMiddleware();