import Cart from "../../models/cart.model.js";
class CartMiddleware {

  cart = async (req, res, next) => {
    if (!req.cookies.cartId) {
      const cart = new Cart();
      await cart.save();

      const expiresTime = Date.now() + 1000 * 60 * 60 * 24 * 365;

      res.cookie("cartId", cart.id, { expires: new Date(expiresTime) });
    } else {
      const cart = await Cart.findOne({
        _id: req.cookies.cartId
      });
      cart.totalQuantity = cart.products.reduce((sum, item) => {
        return sum + item.quantity
      }, 0);
      res.locals.miniCart = cart;
    }
    next();
  }
}
export default new CartMiddleware();