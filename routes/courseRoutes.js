const router = require('express').Router()
const {getCourses, getCourse, makeCourse, updateCourse, deleteCourse} = require('./../views/courseViews')

router.get('/', getCourses)
router.get('/:id', getCourse)
router.post('/make', makeCourse)
router.put('/edit/:id', updateCourse)
router.delete('/delete/:id', deleteCourse)

module.exports = router
