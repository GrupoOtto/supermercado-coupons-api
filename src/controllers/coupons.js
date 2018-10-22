const Coupon = require('../models/Coupon');
const voucher_codes = require('voucher-code-generator');

exports.all = async (args) => Coupon.find(args);

exports.get = async _id => Coupon.findById({ _id });

exports.delete = async _id => Coupon.deleteOne({ _id });

exports.update = async (_id, args) => {
  if (args.code){
    args = {...args, code: voucher_codes.generate(args.code)};
  }
  return await Coupon.findOneAndUpdate({ _id }, args);
};

exports.create = async (args) => {
  const voucher = voucher_codes.generate(args.code);
  return await Coupon.create({...args, code: voucher})
};

