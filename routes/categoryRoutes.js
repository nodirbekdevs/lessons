const router = require('express').Router()
const {getCategories, getCategory, makeCategory, updateCategory, deleteCategory} = require('./../views/categoryViews')

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/make', makeCategory)
router.put('/edit/:id', updateCategory)
router.delete('/delete/"id', deleteCategory)

module.exports = router
