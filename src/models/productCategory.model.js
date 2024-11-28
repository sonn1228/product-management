import slug from 'mongoose-slug-updater';
import mongoose from 'mongoose';

mongoose.plugin(slug);

const { Schema } = mongoose;
const productCategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    thumbnail: String,
    slug: {
      type: String,
      slug: 'description',
      unique: true,
    },
    status: {
      type: String,
      default: "active"
    },
    deleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema, 'products-category');

export default ProductCategory;

/**
 * createdAt: timestamps
 * updatedAt: timestamps  
 * deletedAt
 * 
 * deleted
 * slug
 */
