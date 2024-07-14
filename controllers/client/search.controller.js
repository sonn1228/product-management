const Product = require('../../models/product.model');
const productHelper = require('../../helpers/product.helper');

module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;

  let newProducts = [];
  if (keyword) {
    const regex = new RegExp(keyword);

    const products = await Product.find({
      deleted: false,
      status: 'active',
      title: regex
    })
    newProducts = productHelper.priceNewProducts(products);
  }
  res.render('client/pages/search/index.pug', {
    titlePage: 'Kết quả tìm kiếm',
    keyword: keyword,
    products: newProducts
  })
};
