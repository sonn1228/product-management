import md5 from 'md5';
import systemConfig from '../../config/system.js';
import Account from '../../models/account.model.js';
class AccountController {

  // [GET] /admin/accounts
  index = async (req, res) => {
    const records = await Account.find({ deleted: false });
    res.render('admin/pages/accounts/index.ejs', {
      layout: 'admin/layouts/default.ejs',

      records
    });
  }

  // [GET] /admin/accounts/create
  create = async (req, res) => {
    const records = await Account.find({ deleted: false });
  }

  // [POST] /admin/accounts/create
  createPost = async (req, res) => {
    const existEmail = await Account.findOne({ email: req.body.email });
    if (existEmail) {
      req.flash('error', "Email Existed");
      res.redirect('back');
      return;
    }
    req.body.password = md5(req.body.password);
    const account = new Account(req.body);
    // account.token = generate.generateRandomString(30);

    await account.save();

    req.flash('success', "Create successfully");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }

  // [GET] /admin/accounts/edit/:id
  edit = async (req, res) => {
    const id = req.params.id;
    const data = await Account.findOne({ _id: id });
  }

  // [PATCH] /admin/accounts/edit/:id
  editPatch = async (req, res) => {
    const id = req.params.id;
    const existEmail = await Account.findOne({
      _id: { $ne: id },
      email: req.body.email,
      deleted: false
    });
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    if (existEmail) {
      req.flash('error', "Email Existed");
      res.redirect('back');
      return;
    }
    await Account.updateOne({ _id: id }, req.body);
    req.flash('success', "Update Successfully");
    res.redirect('back');
  }

  // [DELETE] /admin/accounts/delete/:id

  deleteAccount = async (req, res) => {
    const id = req.params.id;
    await Account.deleteOne({ _id: id });
    req.flash('success', "Deleted successfully");
    res.redirect('back');
  }

}
export default new AccountController();