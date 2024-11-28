import productHelper from '../../helpers/product.helper.js';
import Product from '../../models/product.model.js';
import ProductCategory from '../../models/productCategory.model.js';
class ProductController {
  // [GET] /products
  index = async (req, res) => {
    // find
    const find = {
      status: 'active',
      deleted: false,
    };
    const productCategory = await ProductCategory.find({
      deleted: false,
      status: "active"
    })
    console.log("productCategory: ", productCategory);

    // sort
    const sort = {
      position: 'desc',
    };

    const products = await Product.find(find).sort(sort);
    const newProducts = productHelper.priceNewProducts(products);

    res.render('client/pages/products/index.ejs', {
      pageTitle: 'Product client',
      products: newProducts,
      productCategory
    });
  };

  // [GET] /products/detail/:slug
  detail = async (req, res) => {
    try {
      const slug = req.params.slugProduct;

      const find = {
        slug: slug,
        status: 'active',
        deleted: false,
      };

      const product = await Product.findOne(find);
      productHelper.priceNewProduct(product);

      if (product.product_category_id) {
        const productsCategory = await ProductCategory.findOne({
          _id: product.product_category_id,
        });
        product.category = productsCategory;
      }

      res.render('client/pages/products/detail.ejs', {
        product: product,
      });
    } catch (error) {
      res.json(error);
    }
  };

  // [GET] /products/:slugCategory
  category = async (req, res) => {
    try {
      const slug = req.params.slug;
      const category = await ProductCategory.findOne({
        deleted: false,
        slug: slug,
      });
      const productCategory = await ProductCategory.find({
        deleted: false,
        status: "active"
      })

      const products = await Product.find({
        category_id: category._id,
        deleted: false,
        status: 'active',
      }).sort({
        position: 'desc',
      });

      const newProducts = productHelper.priceNewProducts(products);
      res.render('client/pages/products/index.ejs', {
        layout: "client/layouts/default.ejs",
        pageTitle: category.title,
        products: newProducts,
        productCategory
      });
    } catch (error) {
      req.flash('error', 'Page Not Found!');
      res.redirect('/products');
    }
  };

}
export default new ProductController();
