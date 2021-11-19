const router = require('express').Router()
const {getEnrollments, getEnrollment, makeEnrollment, updateEnrollment, deleteEnrollment} = require('./../views/enrollmentViews')

router.get('/', getEnrollments)
router.get('/:id', getEnrollment)
router.post('/make', makeEnrollment)
router.put('/edit/:id', updateEnrollment)
router.delete('/delete/:id', deleteEnrollment)

module.exports = router
