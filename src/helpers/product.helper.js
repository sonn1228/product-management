class productHelper {

  priceNewProducts = (products) => {
    const newProducts = products.map(item => {
      item.priceNew = (item.price - item.price * item.discountPercentage / 100).toFixed(0);
      return item;
    })
    return newProducts;
  }
  priceNewProduct = (product) => {
    product.priceNew = (product.price - product.price * product.discountPercentage / 100).toFixed(0);
  }

}
export default new productHelper();