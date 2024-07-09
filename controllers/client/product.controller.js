const Product = require('../../models/product.model');
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

  res.render('client/pages/products/index.pug', {
    pageTitle: "Product client",
    products: products
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