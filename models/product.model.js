const slug = require('mongoose-slug-updater');
const mongoose = require('mongoose');
mongoose.plugin(slug);

const { Schema } = mongoose;
// khi định nghĩa product x = new Product():
// nếu không có key truyền vào => null / ""/ default value
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: {
    type: String,
    default: 'active',
  },
  position: Number,
  deleted: {
    type: Boolean,
    default: false,
  },
  slug: {
    type: String,
    slug: 'title',
    unique: true
  },
  createdBy: {
    account_id: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  deletedBy: {
    account_id: String,
    deletedAt: {
      type: Date,
    }
  },
  updateBy: [
    {
      account_id: String,
      updatedAt: Date
    }
  ]
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
