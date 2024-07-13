const Product = require('../../models/product.model');
const productHelper = require('../../helpers/product.helper');

module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
    featured: '1',
    status: 'active'
  }
  let productsFeatured = await Product.find(find);

  productsFeatured = productHelper.priceNewProducts(productsFeatured);


  res.render('client/pages/home/index.pug', {
    titlePage: 'Client Product',
    productsFeatured: productsFeatured
  });
};
