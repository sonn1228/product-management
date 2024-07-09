module.exports.createPost = async (req, res, next) => {
  if (!req.body.title) {
    req.flash('error', 'Title is empty! Cannot create product!');
    res.redirect('back');
    return;
  }
  next();
}