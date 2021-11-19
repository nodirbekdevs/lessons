const {Schema, model} = require('mongoose')
const Joi = require('joi')

const category = new Schema({
  name: {type: String, required: true, minlength: 3, maxlength: 50},
  description: {type: String, required: true},
  madeAt: {type: Date, default: Date.now()}
})

const validateCategory = (category) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(50).required()
  };
  return Joi.validate(category, schema);
}

const Category = model('Category', category)

module.exports = {Category, validateCategory}
