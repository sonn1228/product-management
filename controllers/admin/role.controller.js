const systemConfig = require('../../config/system');
const Role = require('../../models/role.model');
//[GET] /admin/roles
module.exports.index = async (req, res) => {

  const records = await Role.find({
    deleted: false
  })

  res.render('admin/pages/roles/index.pug', {
    records: records
  });
}


//[GET] /admin/roles/create
module.exports.create = async (req, res) => {

  const records = await Role.find({
    deleted: false
  })

  res.render('admin/pages/roles/create.pug', {
    records: records
  });
}

//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    req.flash('success', 'Create Successfully');
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    req.flash('error', 'Error');
  }
}


//[DELETE] /admin/roles/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.deleteOne({
      _id: id
    })

    req.flash('success', 'Delete Successfully');
    res.redirect('back');
  } catch (error) {
    req.flash('error', 'Error');
  }
}


//[GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  try {
    const records = await Role.find({
      deleted: false
    })
    res.render('admin/pages/roles/permissions.pug', {
      records: records
    })
  } catch (error) {
    req.flash('error', 'Error');
    res.redirect('back');
  }
}

//[PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);

    for (const item of permissions) {
      await Role.updateOne({
        _id: item.id
      }, {
        permissions: item.permissions
      });
    }

    req.flash('success', "Update successfully");
    res.redirect('back');
  } catch (error) {
    req.flash('error', 'Error');
    res.redirect('back');
  }
}
