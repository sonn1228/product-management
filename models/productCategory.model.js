const slug = require('mongoose-slug-updater');
const mongoose = require('mongoose');
mongoose.plugin(slug);

const { Schema } = mongoose;
const productCategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  parent_id: {
    type: String,
    default: ''
  },
  description: String,
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
  deletedAt: Date,
  slug: {
    type: String,
    slug: 'title',
    unique: true
  },
}, {
  timestamps: true,
});

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, 'products-category');

module.exports = ProductCategory;

/**
 * createAt: timestamps
 * updateAt: timestamps  
 * deleteAt
 * 
 * deleted
 * slug
 */