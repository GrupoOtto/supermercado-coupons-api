const Coupon = require('../models/Coupon');

exports.all = async (args) => Coupon.find(args);

exports.get = async _id => Coupon.findById({ _id });

exports.update = async (_id, args) => Coupon.findOneAndUpdate({ _id }, args);

exports.delete = async _id => Coupon.deleteOne({ _id });

exports.create = async args => Coupon.create(args);
