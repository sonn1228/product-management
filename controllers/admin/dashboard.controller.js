//[GET] /admin/dashboard

module.exports.index = async (req, res) => {
  res.render('admin/pages/dashboard/index.pug');
}


