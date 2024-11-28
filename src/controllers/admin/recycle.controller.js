import createTreeHelper from '../../helpers/createTree.helper.js';
import ProductCategory from '../../models/productCategory.model.js';
import Product from '../../models/product.model.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import Account from '../../models/account.model.js';

// [GET] /admin/products
class RecycleController {

  products = async (req, res) => {
    try {
      // Status filter
      const find = { deleted: true };
      if (req.query.status) {
        find.status = req.query.status;
      }

      // Sorting
      const sort = {};
      if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
      } else {
        sort.position = 'desc';
      }

      // Searching
      const objSearch = { keyword: '' };
      if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, 'i');
        find.title = regex;
        objSearch.keyword = req.query.keyword;
      }

      // Pagination
      const countItem = await Product.countDocuments(find);
      const objPagination = paginationHelper(req, countItem);

      const products = await Product.find(find)
        .limit(objPagination.limitItem)
        .skip(objPagination.skipItem)
        .sort(sort);

      for (const item of products) {
        const user = await Account.findOne({
          _id: item.deletedBy.account_id,
        }).select('-password');
        if (user) {
          item.deletedBy.creator = user.fullName;
        }
      }
      res.render('admin/pages/recycles/index.ejs', {
        layout: 'admin/layouts/default.ejs',

        titlePage: 'Recycle Bin',
        products,
        objSearch,
        objPagination,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  detail = async (req, res) => {
    try {
      const find = { _id: req.params.id };
      const product = await Product.findOne(find);
      if (!product) {
        return res.status(404).send('Product not found');
      }

      res.render('admin/pages/products/detail.ejs', {
        layout: 'admin/layouts/default.ejs',

        titlePage: 'Detail Product',
        product,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  // [GET] /admin/products/change-status/:id
  changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    await Product.updateOne({ _id: id }, { status: status });
    res.redirect('back');
  };

  // [GET] /admin/products/change-multi
  changeMulti = async (req, res) => {
    try {
      const action = req.body.action;
      const ids = req.body.ids.split(', ');
      switch (action) {
        case 'active':
          await Product.updateMany({ _id: ids }, { status: 'active' });
          break;
        case 'inactive':
          await Product.updateMany({ _id: ids }, { status: 'inactive' });
          break;
        case 'delete':
          await Product.updateMany(
            { _id: ids },
            {
              deleted: true,
              deleteBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date(),
              },
            }
          );
          break;
        case 'position':
          for (const item of ids) {
            let [id, position] = item.split('-');
            await Product.updateOne({ _id: id }, { position: position });
          }
          break;
        default:
          break;
      }
      res.redirect('back');
    } catch (error) {
      console.log(error);
    }
  };

  // [GET] /admin/products/create/:id
  create = async (req, res) => {
    const records = await ProductCategory.find({ deleted: false });
    const newRecords = createTreeHelper(records);

    res.render('admin/pages/products/create.ejs', {
      layout: 'admin/layouts/default.ejs',

      titlePage: 'Create Product',
      records: newRecords,
    });
  };

  // [POST] /admin/products/create/
  createPost = async (req, res) => {
    try {
      req.body.price = parseInt(req.body.price);
      req.body.stock = parseInt(req.body.stock);
      req.body.discountPercentage = parseInt(req.body.discountPercentage);
      const countItem = await Product.countDocuments({});
      req.body.position = countItem;
      req.body.createBy = {
        account_id: res.locals.user.id,
      };
      const product = new Product(req.body);
      await product.save();

      req.flash('success', 'Create product successfully');
      res.redirect(`/admin/products/`);
    } catch (error) {
      res.json(error);
    }
  };

  // [GET] /admin/products/edit/:id
  edit = async (req, res) => {
    try {
      const id = req.params.id;
      const find = { _id: id };

      const product = await Product.findOne(find);
      res.render('admin/pages/products/edit.ejs', {
        layout: 'admin/layouts/default.ejs',

        product: product,
      });
    } catch (error) {
      res.json(error);
    }
  };

  // [POST] /admin/products/edit/:id
  editPost = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({ _id: id }, req.body);
    req.flash('success', 'Updated Successfully');
    res.redirect('back');
  };

  // [GET] /admin/products/delete/:id
  deleteProduct = async (req, res) => {
    const id = req.params.id;
    await Product.deleteOne({
      _id: id,
    });
    req.flash('success', 'Delete Successfully!');
    res.redirect('back');
  };

  // [GET] /admin/products/restore/:id
  restoreProduct = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne(
      { _id: id },
      {
        deleted: false,
      }
    );
    req.flash('success', 'Restore Successfully!');
    res.redirect('back');
  };

}
export default new RecycleController();