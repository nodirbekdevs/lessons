const {Book, validateBook} = require('../models/bookModel')

const getBooks = async (req, res) => {
  try {
    const pageNumber = 3
    const pageSize = 10
    const books = await Book.find().skip((pageNumber - 1) * pageSize).limit(pageSize)
    if (!books) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(books)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(book)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getFilteredBooks = async (req, res) => {
  const books = Book
    .find({name: /^F/}) // Muallifning ismi F harfidan boshlangan hujjalarni olib beradi
    .find({name: /od$/i})
    .find({name: /.*ham.*/i})
    .limit(2)
    .sort()
}

const makeBook = async (req, res) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {name, author, tags, isPublished} = req.body
  const book = new Book({name, author, tags, isPublished})
  try {
    await book.save()
    if (!book) res.status(404).json({message: 'Yozilmadi'})
    res.status(200).json(book)
  } catch (e) {
    res.status(500).json(e)
  }

}

const updateBook = async (req, res) => {
  try {
    const { error } = validateBook(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {name, author, tags, isPublished} = req.body
    const book = await Book.findByIdAndUpdate(req.params.id, {name, author, tags, isPublished}, {new: true})
    if (!book) res.status(404).json({message: 'O`zgarmadi'})
    res.status(200).json(book)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteBook = async (req, res) => {
  Book.findByIdAndDelete(req.params.id).then(book => {
    if (book) return res.status(500).json({success: true, message: 'O`chirildi'})
    else return res.status(500).json({success: true, message: 'O`chirilmadi'})
  }).catch(error => {
    return res.status(400).json({success: false, error: error})
  })
}

module.exports = {getBooks, getBook, makeBook, updateBook, deleteBook}
