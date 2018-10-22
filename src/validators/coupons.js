const Joi = require('joi');

const {
  numberSchema,
  stringSchema,
  dateSchema,
  codeSchema,
  offSchema,
  experationSchema
} = require('../utils/validations');

exports.all = {
  query: {
    uses: [...numberSchema, Joi.boolean()],
    description: stringSchema,
    nbf: dateSchema,
    exp: dateSchema,
    code: stringSchema,
    "off.value": numberSchema,
    "off.mark": Joi.string(),
  }
};

exports.create = {
 body: {
    uses: [Joi.boolean().allow(false), Joi.number().integer().min(0)],
    description: Joi.string(),
    nbf: Joi.date(),
    exp: experationSchema,
    code: codeSchema,
    off: offSchema.required()
  }
};

exports.update = {
 body: {
    uses: [Joi.boolean().allow(false), Joi.number().integer().min(0)],
    description: Joi.string(),
    nbf: Joi.date(),
    exp: experationSchema,
    code: codeSchema,
    off: offSchema.required()
  }
};

exports.patch = {
 body: {
    uses: [Joi.boolean().allow(false), Joi.number().integer().min(0)],
    description: Joi.string(),
    nbf: Joi.date(),
    exp: experationSchema,
    code: codeSchema,
    off: offSchema
  }
};

exports.get = {};

exports.delete = {};

