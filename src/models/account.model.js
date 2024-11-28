import mongoose from 'mongoose';

const { Schema } = mongoose;

const accountSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  token: String,
  phone: String,
  avatar: String,
  role_id: String,
  status: {
    type: String,
    default: 'active',
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
}, {
  timestamps: true,
});

const Account = mongoose.model('Account', accountSchema, 'accounts');

export default Account;
