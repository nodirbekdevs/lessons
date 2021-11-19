const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {User} = require('./../models/userModel')
const validate = require('./../utils/functions')
const {secret_jwt} = require('./../utils/keys')

const login = async (req, res) => {
  const {error} = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message);
  const {email, password} = req.body
  const candidate = await User.findOne({email: email})
  if (candidate) {
    const passwordResult = bcrypt.compareSync(password, candidate.password)
    if (passwordResult) {
      const token = candidate.generateAuthToken();
      res.status(200).json({token: `Bearer ${token}`})
    } else {
      res.status(401).json({message: 'Пароли не совпадают. Попробуйте снова'})
    }
  } else {
    res.status(404).json({message: 'Пользователь с таким email не найден'})
  }
}

module.exports = login
