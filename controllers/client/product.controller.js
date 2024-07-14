const productHelper = require('../../helpers/product.helper');
const productsCategoryHelper = require('../../helpers/products-category');
const Product = require('../../models/product.model');
const ProductCategory = require('../../models/productCategory.model');


module.exports.index = async (req, res) => {
  // find
  const find = {
    status: 'active',
    deleted: false
  }
  // sort
  const sort = {
    position: 'desc',
  }

  const products = await Product.find(find).sort(sort);
  const newProducts = productHelper.priceNewProducts(products);


  res.render('client/pages/products/index.pug', {
    pageTitle: "Product client",
    products: newProducts,
  });
}
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;

    const find = {
      slug: slug,
      status: 'active',
      deleted: false
    }

    const product = await Product.findOne(find);

    res.render('client/pages/products/detail.pug', {
      product: product
    });
  } catch (error) {
    res.json(error);
  }
}
module.exports.category = async (req, res) => {
  try {
    const slug = req.params.slugCategory;
    const category = await ProductCategory.findOne({
      slug: slug,
      status: 'active',
      deleted: false
    })




    const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
    const listIdSubCategory = listSubCategory.map(item => item.id);


    const products = await Product.find({
      product_category_id: { $in: [category._id, ...listIdSubCategory] }
    }).sort({
      position: 'desc'
    })

    res.render('client/pages/products/index.pug', {
      pageTitle: category.title,
      products: products,
    });
  } catch (error) {
    req.flash('error', 'Page Not Found!');
    res.redirect('/products')
  }
}

