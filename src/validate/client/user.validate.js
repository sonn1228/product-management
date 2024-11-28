class UserValidate {

  registerPost = async (req, res, next) => {
    if (!req.body.fullName) {
      req.flash('error', 'Title is empty! Cannot create product!');
      res.redirect('back');
      return;
    }
    if (!req.body.password) {
      req.flash('error', 'Title is empty! Cannot create product!');
      res.redirect('back');
      return;
    }
    if (!req.body.email) {
      req.flash('error', 'Title is empty! Cannot create product!');
      res.redirect('back');
      return;
    }
    next();
  }

  resetPasswordPost = async (req, res, next) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password != confirmPassword) {
      req.flash("error", "Xác nhận mật khẩu không khớp!");
      res.redirect("back");
      return;
    }
    next()
  }
}

export default new UserValidate();