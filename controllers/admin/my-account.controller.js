const Role = require('../../models/role.model');
//[GET] /admin/roles
module.exports.index = async (req, res) => {
  const user = res.locals.user;
  const role = await Role.findOne({
    _id: user.role_id
  })
  res.render('admin/pages/my-account/index.pug', {
    user: user,
    role: role

  });
}
//[GET] /admin/edit
module.exports.edit = async (req, res) => {
  res.send('<h1>Edit account</h1>')
}


