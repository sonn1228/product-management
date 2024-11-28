import slug from 'mongoose-slug-updater';
import mongoose from 'mongoose';

mongoose.plugin(slug);

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category_id: String,
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
      unique: true,
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    featured: {
      type: String,
      default: '0',
    },
    deletedBy: {
      account_id: String,
      deletedAt: {
        type: Date,
      },
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema, 'products');

export default Product;
