const {Schema, model} = require('mongoose')
const Joi = require('joi')

const Enrollment = model('Enrollment', new Schema({
  customer: {type: Schema.Types.ObjectId, refs: 'Customer', required: true},
  course: {type: Schema.Types.ObjectId, refs: 'Course', required: true},
  courseFee: {type: Number, min: 0},
  dateStart: {type: Date, required: true, default: Date.now},
}));

function validateEnrollment(enrollment) {
  const schema = {
    customerId: Joi.string().required(),
    courseId: Joi.string().required()
  };
  return Joi.validate(enrollment, schema);
}

module.exports = {Enrollment, validateEnrollment}
