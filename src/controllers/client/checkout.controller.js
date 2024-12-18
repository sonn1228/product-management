import Cart from '../../models/cart.model.js';
import Order from '../../models/order.model.js';
import Product from '../../models/product.model.js';
class CheckoutController {

  // [GET] /checkout/
  index = async (req, res) => {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });

    cart.totalPrice = 0;

    for (const item of cart.products) {
      const infoProduct = await Product.findOne({
        _id: item.product_id,
      }).select('thumbnail title price discountPercentage stock slug');

      infoProduct.priceNew = (infoProduct.price * (100 - infoProduct.discountPercentage) / 100).toFixed(0);

      infoProduct.totalPrice = infoProduct.priceNew * item.quantity;

      cart.totalPrice += infoProduct.totalPrice;

      item.infoProduct = infoProduct;
    }

    res.render('client/pages/checkout/index.ejs', {
      pageTitle: 'Đặt hàng',
      cartDetail: cart,
    });
  };

  // [POST] /checkout/order
  order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;

    const cart = await Cart.findOne({
      _id: cartId,
    });

    const products = [];

    for (const item of cart.products) {
      const product = await Product.findOne({
        _id: item.product_id,
      });

      const objectProduct = {
        product_id: item.product_id,
        price: product.price,
        discountPercentage: product.discountPercentage,
        quantity: item.quantity,
      };

      products.push(objectProduct);
    }

    const dataOrder = {
      // user_id: String,
      cart_id: cartId,
      userInfo: userInfo,
      products: products,
    };

    const order = new Order(dataOrder);
    await order.save();

    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        products: [],
      }
    );

    res.redirect(`/checkout/success/${order.id}`);
  };

  // [GET] /checkout/success/:orderId
  success = async (req, res) => {
    try {
      const orderId = req.params.orderId;

      const order = await Order.findOne({
        _id: orderId,
      });

      order.totalPrice = 0;

      for (const product of order.products) {
        const productInfo = await Product.findOne({
          _id: product.product_id,
        });

        product.title = productInfo.title;
        product.thumbnail = productInfo.thumbnail;
        product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);
        product.totalPrice = product.priceNew * product.quantity;

        order.totalPrice += product.totalPrice;
      }

      res.render('client/pages/checkout/success.ejs', {
        pageTitle: 'Đặt hàng thành công',
        order: order,
      });
    } catch (error) {
      res.redirect('/');
    }
  };

}
export default new CheckoutController();
