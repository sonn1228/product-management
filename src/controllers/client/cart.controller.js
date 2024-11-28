import Product from '../../models/product.model.js';
import Cart from '../../models/cart.model.js';

class CartController {

  // [GET] /cart
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

    res.render('client/pages/cart/index.ejs', {
      pageTitle: 'Giỏ hàng',
      cartDetail: cart,
    });
  };

  // [POST] /cart/add/:productId
  addPost = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    try {
      const cart = await Cart.findOne({
        _id: cartId,
      });
      const existProductInCart = cart.products.find((item) => item.product_id == productId);

      if (existProductInCart) {
        const quantityUpdate = existProductInCart.quantity + quantity;

        await Cart.updateOne(
          {
            _id: cartId,
            'products.product_id': productId,
          },
          {
            $set: { 'products.$.quantity': quantityUpdate },
          }
        );
      } else {
        const objectCart = {
          product_id: productId,
          quantity: quantity,
        };

        await Cart.updateOne(
          {
            _id: cartId,
          },
          {
            $push: { products: objectCart },
          }
        );
      }
      req.flash('success', 'Đã thêm sản phẩm vào giỏ hàng.');
    } catch (error) {
      req.flash('error', 'Thêm sản phẩm vào giỏ hàng không thành công!');
    }

    res.redirect('back');
  };

  // [GET] /cart/delete/:productId
  deleteItem = async (req, res) => {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;

    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $pull: { products: { product_id: productId } },
      }
    );

    req.flash('success', 'Đã xóa sản phẩm khỏi giỏ hàng!');

    res.redirect('back');
  };

  // [GET] /cart/update/:productId/:quantity
  updateItem = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    const cartId = req.cookies.cartId;

    await Cart.updateOne(
      {
        _id: cartId,
        'products.product_id': productId,
      },
      {
        $set: { 'products.$.quantity': quantity },
      }
    );

    req.flash('success', 'Cập nhật sản phẩm thành công!');

    res.redirect('back');
  };

}
export default new CartController();