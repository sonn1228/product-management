import Product from '../../models/product.model.js';
import productHelper from '../../helpers/product.helper.js';
import ProductCategory from '../../models/productCategory.model.js';
class HomeController {

  index = async (req, res) => {
    const find = {
      deleted: false,
      featured: '1',
      status: 'active',
    };
    const productCategory = await ProductCategory.find({
      deleted: false,
      status: "active"
    })
    const productsFeatured = await Product.find(find);
    const newProductsFeatured = productHelper.priceNewProducts(productsFeatured);

    // New products
    const productsNew = await Product.find({
      status: 'active',
      deleted: false,
    }).limit(6).sort({
      position: 'desc',
    });

    const newProductsNew = productHelper.priceNewProducts(productsNew);

    res.render('client/pages/home/index', {
      layout: 'client/layouts/default.ejs',
      titlePage: 'Client Product',
      productsFeatured: newProductsFeatured,
      productsNew: newProductsNew,
      productCategory
    });
  };
}
export default new HomeController();
