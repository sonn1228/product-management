const generate = require('../../helpers/generate.helper');
const md5 = require('md5');
const Role = require('../../models/role.model');

const systemConfig = require('../../config/system');
const Account = require('../../models/account.model');
//[GET] /admin/accounts
module.exports.index = async (req, res) => {

  const records = await Account.find({
    deleted: false
  })


  res.render('admin/pages/accounts/index.pug', {
    records: records
  });
}


//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {

  const records = await Account.find({
    deleted: false
  })
  const roles = await Role.find({
    deleted: false
  })
  res.render('admin/pages/accounts/create.pug', {
    records: records,
    roles: roles,

  });
}
//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const existEmail = await Account.findOne({
    email: req.body.email
  })
  if (existEmail) {
    req.flash('error', "Email Existed");
    res.redirect('back');
    return;
  }
  req.body.password = md5(req.body.password);
  const account = new Account(req.body);
  account.token = generate.generateRandomString(30);
  await account.save();

  req.flash('success', "Create successfully");
  res.redirect(`${systemConfig.prefixAdmin}/accounts`);
}

//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const data = await Account.findOne({
    _id: id
  })
  const roles = await Role.find({
    deleted: false
  })
  res.render('admin/pages/accounts/edit.pug', {
    data: data,
    roles: roles
  });
}
//[PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const existEmail = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false
  })
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  }
  else {
    delete req.body.password;
  }
  if (existEmail) {
    req.flash('error', "Email Existed")
    res.redirect('back');
    return;
  }
  await Account.updateOne({
    _id: id
  }, req.body)
  req.flash('success', "Update Successfully");
  res.redirect('back');
}



/**
 * show
 * create
 * edit
 * delete
 */



module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Account.deleteOne({
    _id: id
  })
  req.flash('success', "delete successfully");
  res.redirect('back');
}