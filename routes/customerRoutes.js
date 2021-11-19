const router = require('express').Router()
const {getCustomers, getCustomer, makeCustomer, updateCustomer, deleteCustomer} = require('./../views/customerViews')

router.get('/', getCustomers)
router.get('/:id', getCustomer)
router.post('/make', makeCustomer)
router.put('/edit/:id', updateCustomer)
router.delete('/delete/:id', deleteCustomer)

module.exports = router
