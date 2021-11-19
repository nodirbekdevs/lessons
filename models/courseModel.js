const {Schema, model} = require('mongoose')
const Joi = require('joi')

const Course = model('Course', new Schema({
  title: {type: String, required: true, trim: true, minlength: 5, maxlength: 255},
  category: {type: Schema.Types.ObjectId, refs: 'Category', required: true},
  trainer: {type: String, required: true},
  tags: {type: [String]},
  status: {type: String, enum: ['Active', 'Inactive'], required: true},
  fee: {type: Number, required: true}
}));

function validateCourse(course) {
  const schema = {
    title: Joi.string().min(3).max(50).required(),
    categoryId: Joi.string().required(),
    trainer: Joi.string().required(),
    status: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    fee: Joi.number().min(0)
  };
  return Joi.validate(course, schema);
}

module.exports = {Course, validateCourse}
