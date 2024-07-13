const ProductCategory = require('../../models/productCategory.model');
const systemConfig = require('../../config/system');
const createTreeHelper = require('../../helpers/createTree.helper');

// [GET]/admin/products-category
module.exports.index = async (req, res) => {
  try {
    const find = { deleted: false };
    const records = await ProductCategory.find(find);
    const newRecords = createTreeHelper(records);


    res.render('admin/pages/products-category/index.pug', {
      titlePage: "Product list",
      records: newRecords
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
}

// [DELETE]/admin/products-category/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await ProductCategory.deleteOne({ _id: id });
    res.redirect('back');
  } catch (error) {
    res.json(error);
  }
}
// [GET]/admin/products-category/create
module.exports.create = async (req, res) => {
  const find = { deleted: false };

  const records = await ProductCategory.find(find);

  const newRecords = createTreeHelper(records);

  res.render('admin/pages/products-category/create.pug', {
    records: newRecords
  })
}
// [POST]/admin/products-category/create
module.exports.createPost = async (req, res) => {
  try {
    const count = await ProductCategory.countDocuments({});
    if (req.body.position) {
      req.body.position = parseInt(req.body.position);
    }
    else {
      req.body.position = count + 1;
    }


    const record = new ProductCategory(req.body);
    await record.save();


    req.flash('success', 'Create successs');
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  } catch (error) {
    res.json(error);
  }
}

// [GET]/admin/products-category/edit
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const find = {
      _id: id,
      deleted: false
    }
    const record = await ProductCategory.findOne(find);


    const records = await ProductCategory.find({
      deleted: false
    });
    const newRecords = createTreeHelper(records);
    res.render('admin/pages/products-category/edit.pug', {
      record: record,
      records: newRecords
    })
  } catch (error) {
    req.flash('error', 'Category product Not found');
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
}
// [PATCH]/admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);


    await ProductCategory.updateOne({ _id: id }, req.body);
    req.flash('Update Success');
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  } catch (error) {
    res.json(error)
  }
}
// [GET]/admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const find = {
      _id: id,
      deleted: false
    }
    const record = await ProductCategory.findOne(find);

    const records = await ProductCategory.find({
      deleted: false
    });
    const newRecords = createTreeHelper(records);
    res.render('admin/pages/products-category/detail.pug', {
      record: record,
      records: newRecords
    })

  } catch (error) {
    res.json(error)
  }
}