const {User, validateUser} = require('../models/userModel')
const {Id, salt} = require('./../utils/keys')

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getUser = async (req, res) => {
  try {
    if (!Id(req.params.id)) res.status(404).json({message: 'Yaroqsiz Id'})
    const user = await User.findById(req.params.id)
    if (!user) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(user)
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeUser = async (req, res) => {
  const {error} = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message);
  const {name, email, password, isAdmin} = req.body
  const candidate = await User.findOne({email: email})
  if (candidate) {
    res.status(409).json({message: 'Такой email уже занят. Попробуйте другой'})
  } else {
    const user = new User({name, email, password: bcrypt.hashSync(password, salt), isAdmin})
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      console.log(e)
    }
  }
}

const updateUser = async (req, res) => {
  try {
    if (!Id(req.params.id)) res.status(404).json({message: 'Yaroqsiz Id'})
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {name, email, password, isAdmin} = req.body
    const user = await User.findByIdAndUpdate(req.params.id, {name, email, password, isAdmin}, {new: true})
    if (!user) res.status(404).json({message: 'O`zgarmadi'})
    res.status(200).json(user)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteUser = async (req, res) => {
  if (!Id(req.params.id)) res.status(404).json({message: 'Yaroqsiz Id'})
  User.findByIdAndDelete(req.params.id).then(user => {
    if (user) return res.status(500).json({success: true, message: 'O`chirildi'})
    else return res.status(500).json({success: true, message: 'O`chirilmadi'})
  }).catch(error => {
    return res.status(400).json({success: false, error: error})
  })
}

module.exports = {getUsers, getUser, makeUser, updateUser, deleteUser}
