const router = require('express').Router()
const {getBooks, getBook, makeBook, updateBook, deleteBook} = require('./../views/bookViews')

router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/make', makeBook)
router.put('/edit/:id', updateBook)
router.delete('/delete/"id', deleteBook)

module.exports = router
