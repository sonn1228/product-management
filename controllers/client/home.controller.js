const Product = require('../../models/product.model');
const productHelper = require('../../helpers/product.helper');

module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
    featured: '1',
    status: 'active'
  }
  const productsFeatured = await Product.find(find);

  const newProductsFeatured = productHelper.priceNewProducts(productsFeatured);

  // new product
  const productsNew = await Product.find({
    status: 'active',
    deleted: false
  }).limit(6).sort({
    position: "desc"
  });

  const newProductsNew = productHelper.priceNewProducts(productsNew);

  // end new product

  res.render('client/pages/home/index.pug', {
    titlePage: 'Client Product',
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew
  });
};
