module.exports.registerPost = async (req, res, next) => {
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