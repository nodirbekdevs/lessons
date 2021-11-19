const {Schema, model} = require('mongoose')
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const {secret_jwt} = require('./../utils/keys')

const user = new Schema({
  name: {type: String, required: true, minlength: 3, maxlength: 50},
  email: {type: String, required: true, minlength: 5, maxlength: 255, unique: true},
  password: {type: String, required: true, minlength: 5, maxlength: 1024},
  isAdmin: {type: Boolean, default: false}
});

user.methods.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, secret_jwt, {expiresIn: 60 * 60});
  return token;
}

const User = model('User', user);

function validateUser (userSchema) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    isAdmin: Joi.boolean().required()
  };
  return Joi.validate(userSchema, schema);
}

module.exports = {User, validateUser}
