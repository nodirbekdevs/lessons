const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const Extract = require('passport-jwt').ExtractJwt

const PORT = 4000
const api_url = '/api'
const mongo_url = 'mongodb://localhost/books'
const mongo_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const Id = mongoose.Schema.Types.ObjectId.isValid
const salt = bcrypt.genSaltSync(10)
const secret_jwt = 'dev-jwt'
const IsAuthenticated = passport.authenticate('jwt', {session: false})
const passport_options = {
  jwtFromRequest: Extract.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret_jwt
}
// const transfer = upload.single('image')



module.exports = {PORT, api_url, mongo_url, mongo_options, Id, salt, secret_jwt, passport_options, IsAuthenticated}
