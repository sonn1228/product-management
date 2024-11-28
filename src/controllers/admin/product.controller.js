import createTreeHelper from '../../helpers/createTree.helper.js';
import ProductCategory from '../../models/productCategory.model.js';
import Product from '../../models/product.model.js';
import paginationHelper from '../../helpers/pagination.helper.js';
import Account from '../../models/account.model.js';

class ProductController {
  // [GET] /admin/products
  async index(req, res) {
    try {
      // Status filter
      const find = { deleted: false };
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

      // Fetch products
      const products = await Product.find(find)
        .limit(objPagination.limitItem)
        .skip(objPagination.skipItem)
        .sort(sort);

      for (const product of products) {
        const user = await Account.findOne({
          _id: product.createdBy.account_id,
        });
        if (user) {
          product.createdBy.fullName = user.fullName;
        }

        const updatedBy = product.updatedBy.slice(-1)[0];
        if (updatedBy) {
          const updater = await Account.findOne({
            _id: updatedBy.account_id,
          });
          updatedBy.fullName = updater.fullName;
        }
      }

      res.render('admin/pages/products/index.ejs', {
        layout: "admin/layouts/default.ejs",
        titlePage: 'Product list',
        products,
        objSearch,
        objPagination,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  // [GET] /admin/products/:id
  async detail(req, res) {
    try {
      const find = { _id: req.params.id };
      const product = await Product.findOne(find);
      if (!product) {
        return res.status(404).send('Product not found');
      }

      res.render('admin/pages/products/detail.ejs', {
        layout: "admin/layouts/default.ejs",
        titlePage: 'Detail Product',
        product,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  // [GET] /admin/products/delete/:id
  async deleteProduct(req, res) {
    await Product.updateOne(
      { _id: req.params.id },
      {
        deleted: true,
        deletedBy: {
          account_id: res.locals.user.id,
          deletedAt: Date.now(),
        },
      }
    );
    res.redirect('back');
  }

  // [GET] /admin/products/change-status/:id
  async changeStatus(req, res) {
    const id = req.params.id;
    const status = req.params.status;
    await Product.updateOne(
      { _id: id },
      {
        status: status,
        $push: {
          updatedBy: {
            account_id: res.locals.user.id,
            updatedAt: new Date(),
          },
        },
      }
    );
    res.redirect('back');
  }

  // [GET] /admin/products/change-multi
  async changeMulti(req, res) {
    try {
      const action = req.body.action;
      const ids = req.body.ids.split(', ');
      const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date(),
      };
      switch (action) {
        case 'active':
          await Product.updateMany(
            { _id: ids },
            {
              status: 'active',
              $push: {
                updatedBy: updatedBy,
              },
            }
          );
          break;
        case 'inactive':
          await Product.updateMany(
            { _id: ids },
            {
              status: 'inactive',
              $push: {
                updatedBy: updatedBy,
              },
            }
          );
          break;
        case 'delete':
          await Product.updateMany(
            { _id: ids },
            {
              deleted: true,
              $push: {
                updatedBy: updatedBy,
              },
            }
          );
          break;
        case 'position':
          for (const item of ids) {
            let [id, position] = item.split('-');
            await Product.updateOne(
              { _id: id },
              {
                position: position,
                $push: {
                  updatedBy: updatedBy,
                },
              }
            );
          }
          break;
        default:
          break;
      }
      res.redirect('back');
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] /admin/products/create/:id
  async create(req, res) {
    const categories = await ProductCategory.find({ deleted: false });
    res.render('admin/pages/products/create.ejs', {
      layout: 'admin/layouts/default.ejs',
      titlePage: 'Create Product',
      categories,
    });
  }

  // [POST] /admin/products/create/
  async createPost(req, res) {
    try {
      const price = parseInt(req.body.price);
      const stock = parseInt(req.body.stock);
      const discountPercentage = parseInt(req.body.discountPercentage);

      if (isNaN(price) || isNaN(stock) || isNaN(discountPercentage)) {
        return res.status(400).json({ error: "Invalid input data" });
      }

      const countItem = await Product.countDocuments({});
      const productData = {
        ...req.body,
        price,
        stock,
        discountPercentage,
        position: countItem,
      };
      console.log("productData: ", productData);


      // Validate productData (ví dụ: sử dụng Joi)

      const product = new Product(productData);
      await product.save();

      // req.flash('success', 'Create product successfully');
      res.redirect(`/admin/products`);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create product" });
    }
  }

  // [GET] /admin/products/edit/:id
  async edit(req, res) {
    try {
      const id = req.params.id;
      const find = {
        _id: id,
      };

      const product = await Product.findOne(find);
      res.render('admin/pages/products/edit.ejs', {
        layout: "admin/layouts/default.ejs",

        product: product,
      });
    } catch (error) {
      res.json(error);
    }
  }

  // [POST] /admin/products/edit/:id
  async editPatch(req, res) {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.price = parseInt(req.body.price);

    await Product.updateOne(
      { _id: id },
      {
        ...req.body,
        $push: {
          updatedBy: {
            account_id: res.locals.user.id,
            updatedAt: new Date(),
          },
        },
      }
    );
    req.flash('success', 'Updated Successfully');
    res.redirect('back');
  }
}

export default new ProductController();
