const {Customer, validateCustomer} = require('../models/customerModel')

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort('name')
    if (!customers) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(customers)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(customer)
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeCustomer = async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {name, isVip, phone, bonusPoints} = req.body
  const customer = new Customer({name, isVip, phone, bonusPoints})
  try {
    await customer.save()
    if (!customer) res.status(404).json({message: 'Yozilmadi'})
    res.status(200).json(customer)
  } catch (e) {
    res.status(500).json(e)
  }

}

const updateCustomer = async (req, res) => {
  try {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {name, isVip, phone, bonusPoints} = req.body
    const customer = await Customer.findByIdAndUpdate(req.params.id, {name, isVip, phone, bonusPoints}, {new: true})
    if (!customer) res.status(404).json({message: 'O`zgarmadi'})
    res.status(200).json(customer)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteCustomer = async (req, res) => {
  Customer.findByIdAndDelete(req.params.id).then(customer => {
    if (customer) return res.status(500).json({success: true, message: 'O`chirildi'})
    else return res.status(500).json({success: true, message: 'O`chirilmadi'})
  }).catch(error => {
    return res.status(400).json({success: false, error: error})
  })
}

module.exports = {getCustomers, getCustomer, makeCustomer, updateCustomer, deleteCustomer}
