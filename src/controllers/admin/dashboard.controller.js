import Product from "../../models/product.model.js";

class DashboardController {
  // [GET] /admin/dashboard/
  async index(req, res) {
    const statistic = {
      categoryProduct: { total: 0, active: 0, inactive: 0 },
      product: { total: 0, active: 0, inactive: 0 },
      account: { total: 0, active: 0, inactive: 0 },
      user: { total: 0, active: 0, inactive: 0 },
    };

    statistic.product.total = await Product.countDocuments({ deleted: false });
    statistic.product.active = await Product.countDocuments({ deleted: false, status: "active" });
    statistic.product.inactive = await Product.countDocuments({ deleted: false, status: "inactive" });

    res.render("admin/pages/dashboard/index.ejs", {
      layout: "admin/layouts/default.ejs",
      titlePage: "Trang tổng quan",
      statistic,
    });
  }
}

export default new DashboardController();
