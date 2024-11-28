import SettingGeneral from '../../models/setting-general.model.js'
class SettingsController {
  // [GET] /admin/settings/general
  async general(req, res) {
    const settingGenerals = await SettingGeneral.findOne({});
    res.render('admin/pages/settings/general.ejs', {
      layout: 'admin/layouts/default.ejs',
      pageTitle: 'Cài đặt chung',
      settingGeneral: settingGenerals,
    });
  }

  // [PATCH] /admin/settings/general
  async generalPatch(req, res) {
    const settingGeneral = await SettingGeneral.findOne({});
    if (settingGeneral) {
      await SettingGeneral.updateOne(
        {
          _id: settingGeneral.id,
        },
        req.body
      );
    } else {
      const record = new SettingGeneral(req.body);
      await record.save();
    }
    req.flash('success', 'Update Successfully!');
    res.redirect('back');
  }
}

export default new SettingsController();
