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
    if (this.nbf && this.nbf > now){
      return false;
    }
    if (this.exp && this.exp < now){
      return false;
    }
    if (this.uses !== undefined && this.uses < 1){
      return false;
    }
    return true;
  }
});

CouponSchema.statics = {};

module.exports = mongoose.model('Coupon', CouponSchema);
