const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  off: {
    value: {
      type: Number,
      required: true,
    },
    mark: {
      type: String,
      required: true,
      enum: ['%', '$']
    }
  },
  uses: {
    type: Number,
    default: 1,
  },
  nbf: {
    type: Date
  },
  exp: {
    type: Date
  },
  description: {
    type: String
  }
});

CouponSchema.method({
  isValid: function () {
    const now = Date.now();
    return this.uses > 0 && this.nbf > now && this.exp < now;
  }
});

CouponSchema.statics = {};

module.exports = mongoose.model('Coupon', CouponSchema);
