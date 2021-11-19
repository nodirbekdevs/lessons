const {Category, validateCategory} = require('../models/categoryModel')

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort('name')
    if (!categories) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(categories)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(category)
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeCategory = async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = new Category({name: req.body.name})
  try {
    await category.save()
    if (!category) res.status(404).json({message: 'Yozilmadi'})
    res.status(200).json(category)
  } catch (e) {
    res.status(500).json(e)
  }

}

const updateCategory = async (req, res) => {
  try {
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
    if (!category) res.status(404).json({message: 'O`zgarmadi'})
    res.status(200).json(category)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteCategory = async (req, res) => {
  Category.findByIdAndDelete(req.params.id).then(category => {
    if (category) return res.status(500).json({success: true, message: 'O`chirildi'})
    else return res.status(500).json({success: true, message: 'O`chirilmadi'})
  }).catch(error => {
    return res.status(400).json({success: false, error: error})
  })
}

module.exports = {getCategories, getCategory, makeCategory, updateCategory, deleteCategory}
