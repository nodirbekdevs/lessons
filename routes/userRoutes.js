const router = require('express').Router()
const {getUsers, getUser, makeUser, updateUser, deleteUser} = require('./../views/userViews')
const {IsAuthenticated} = require('./../utils/keys')
const IsAdminUser = require('./../middleware/admin')

router.get('/', [IsAuthenticated, IsAdminUser], getUsers)
router.get('/:id', getUser)
router.post('/make', makeUser)
router.put('/edit/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router
