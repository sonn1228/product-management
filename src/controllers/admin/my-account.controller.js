import Account from '../../models/account.model.js';

class MyAccontController {

  index = async (req, res) => {
    const user = res.locals.user;
    res.render('admin/pages/my-account/index.ejs', {
      layout: "admin/layouts/default.ejs",
      user: user,
    });
  };

  // [GET] /admin/edit
  edit = async (req, res) => {
    res.render('admin/pages/my-account/edit.ejs', {
      layout: "admin/layouts/default.ejs",
    });
  };

  // [PATCH] /admin/editPatch
  editPatch = async (req, res) => {
    const id = res.locals.user.id;
    const existEmail = await Account.findOne({
      _id: { $ne: id },
      email: req.body.email,
      deleted: false,
    });

    if (existEmail) {
      req.flash('error', 'Email Existed');
      res.redirect('back');
      return;
    }

    await Account.updateOne({
      _id: id,
    }, req.body);

    req.flash('success', 'Update Successfully');
    res.redirect('back');
  };

}

export default new MyAccontController();