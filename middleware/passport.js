const Strategy = require('passport-jwt').Strategy
const {User} = require('./../models/userModel')
const {passport_options} = require('./../utils/keys')

module.exports = passport => {
  passport.use(
    new Strategy(passport_options, async (payload, done) => {
      try {
        const user = await User.findById(payload._id).select('username id')
        user ? done(null, user) : done(null, false)
      } catch (e) {
        console.log(e)
      }
    })
  )
}
