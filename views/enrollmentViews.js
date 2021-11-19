const {Enrollment, validateEnrollment} = require('../models/enrollmentModel')
const {Id} = require('./../utils/keys')

const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('customer', 'course')
    if (!enrollments) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(enrollments)
  } catch (e) {
    res.status(500).json(e)
  }
}

const getEnrollment = async (req, res) => {
  try {
    if (!Id(req.params.id)) res.status(404).json({message: 'Yaroqsiz Id'})
    const enrollment = await Enrollment.findById(req.params.id).populate('customer', 'course')
    if (!enrollment) res.status(404).json({message: 'Topilamdi'})
    res.status(200).json(enrollment)
  } catch (e) {
    res.status(500).json(e)
  }
}

const makeEnrollment = async (req, res) => {
  const { error } = validateEnrollment(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const {customer, course, courseFee} = req.body
  const enrollment = new Enrollment({customer, course, courseFee})
  if (customer.isVip) enrollment.courseFee = course.fee - (0.2 * course.fee)
  try {
    await enrollment.save()
    customer.bonusPoints++
    customer.save()
    if (!enrollment) res.status(404).json({message: 'Yozilmadi'})
    res.status(200).json(enrollment)
  } catch (e) {
    res.status(500).json(e)
  }

}

const updateEnrollment = async (req, res) => {
  try {
    if (!Id(req.params.id)) res.status(404).json({message: 'Yaroqsiz Id'})
    const { error } = validateEnrollment(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {customer, course, courseFee} = req.body
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, {customer, course, courseFee}, {new: true})
    if (!enrollment) res.status(404).json({message: 'O`zgarmadi'})
    res.status(200).json(enrollment)
  } catch (e) {
    res.status(500).json(e)
  }
}

const deleteEnrollment = async (req, res) => {
  if (!Id(req.params.id)) res.status(404).json({message: 'Yaroqsiz Id'})
  Enrollment.findByIdAndDelete(req.params.id).then(enrollment => {
    if (enrollment) return res.status(500).json({success: true, message: 'O`chirildi'})
    else return res.status(500).json({success: true, message: 'O`chirilmadi'})
  }).catch(error => {
    return res.status(400).json({success: false, error: error})
  })
}

module.exports = {getEnrollments, getEnrollment, makeEnrollment, updateEnrollment, deleteEnrollment}
