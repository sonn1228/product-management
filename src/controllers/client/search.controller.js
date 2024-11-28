import Product from '../../models/product.model.js';
import productHelper from '../../helpers/product.helper.js';
class SearchController {

  index = async (req, res) => {
    const keyword = req.query.keyword;

    let newProducts = [];
    if (keyword) {
      const regex = new RegExp(keyword, 'i'); // Added 'i' flag for case-insensitive search

      const products = await Product.find({
        deleted: false,
        status: 'active',
        title: regex,
      });
      newProducts = productHelper.priceNewProducts(products);
    }

    res.render('client/pages/search/index.ejs', {
      titlePage: 'Kết quả tìm kiếm',
      keyword: keyword,
      products: newProducts,
    });
  };

}
export default new SearchController();