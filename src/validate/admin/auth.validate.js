class AuthValidate {
  loginPost = async (req, res, next) => {
    if (!req.body.password) {
      req.flash('error', 'password is empty! Cannot create Account!');
      res.redirect('back');
      return;
    }
    if (!req.body.email) {
      req.flash('error', 'email is empty! Cannot create Account!');
      res.redirect('back');
      return;
    }
    next();
  }
}
export default new AuthValidate();