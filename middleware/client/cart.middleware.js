const Cart = require("../../models/cart.model");

module.exports.cart = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    const expiresTime = Date.now() + 1000 * 60 * 60 * 24 * 365;

    res.cookie("cartId", cart.id, { expires: new Date(expiresTime) });
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId
    });

  }
  next();
}