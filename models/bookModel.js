const {Schema, model} = require('mongoose')
const Joi = require('joi')

const book = new Schema({
  name: {type: String, required: true},
  author: {type: String, required: true},
  tags: [{type: String}],
  madeAt: {type: Date, default: Date.now()},
  isPublished: {type: Boolean, default: false, required: true}
})

const validateBook = (book) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    author: Joi.string().min(3).max(50).required(),
    tags: Joi.array().items(Joi.string()),
    isPublished: Joi.bool().required()
  };
  return Joi.validate(book, schema);
}

const Book = model('Book', book)

module.exports = {Book, validateBook}
