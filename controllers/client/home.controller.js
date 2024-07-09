const Product = require('../../models/product.model')
module.exports.index = async (req, res) => {
  const find = { status: 'active' }
  const products = await Product.find(find);
  res.render('client/pages/home/index.pug', {
    titlePage: 'Client Product',
    products: products
  });
}