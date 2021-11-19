const {Course, validateCourse} = require('../models/courseModel')
const {Id} = require('./../utils/keys')

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('category')
    if (!courses) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(courses)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getCourse = async (req, res) => {
  try {
    if (!Id(req.params.id)) res.status(404).json({message: 'Yaroqsiz Id'})
    const course = await Course.findById(req.params.id).populate('category')
    if (!course) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(course)
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeCourse = async (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {title, category, trainer, tags, status, fee} = req.body
  const course = new Course({title, category, trainer, tags, status, fee})
  try {
    await course.save()
    if (!course) res.status(404).json({message: 'Yozilmadi'})
    res.status(200).json(course)
  } catch (e) {
    res.status(500).json(e)
  }

}

const updateCourse = async (req, res) => {
  try {
    if (!Id(req.params.id)) res.status(404).json({message: 'Yaroqsiz Id'})
    const { error } = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {title, category, trainer, tags, status, fee} = req.body
    const course = await Course.findByIdAndUpdate(req.params.id,
      {title, category, trainer, tags, status, fee}, {new: true})
    if (!course) res.status(404).json({message: 'O`zgarmadi'})
    res.status(200).json(course)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteCourse = async (req, res) => {
  if (!Id(req.params.id)) res.status(404).json({message: 'Yaroqsiz Id'})
  Course.findByIdAndDelete(req.params.id).then(course => {
    if (course) return res.status(500).json({success: true, message: 'O`chirildi'})
    else return res.status(500).json({success: true, message: 'O`chirilmadi'})
  }).catch(error => {
    return res.status(400).json({success: false, error: error})
  })
}

module.exports = {getCourses, getCourse, makeCourse, updateCourse, deleteCourse}
