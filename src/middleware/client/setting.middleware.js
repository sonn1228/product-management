import SettingGeneral from "../../models/setting-general.model.js";
const settingsGeneral = async (req, res, next) => {
  const settingsGeneral = await SettingGeneral.findOne({});

  res.locals.settingsGeneral = settingsGeneral;

  next();
}
export default settingsGeneral;