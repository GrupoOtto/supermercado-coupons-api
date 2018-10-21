const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  amountType: {
    type: String,
    enum: ['percentage', 'flat']
  },
  uses: {
    type: Number,
    required: true,
    default: 0,
  }
  expirationDate: {
    type: Date
  },
  description: {
    type: String
  }
});

CouponSchema.method({});

CouponSchema.statics = {};

module.exports = mongoose.model('Coupon', CouponSchema);
