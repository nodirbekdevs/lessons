const express = require('express')
const bookRoutes = require('./bookRoutes')
const categoryRoutes = require('./categoryRoutes')
const customerRoutes = require('./customerRoutes')
const courseRoutes = require('./courseRoutes')
const enrollmentRoutes = require('./enrollmentRoutes')
const userRoutes = require('./userRoutes')

const main = express()

main.use('/books', bookRoutes)
main.use('/categories', categoryRoutes)
main.use('/customers', customerRoutes)
main.use('/courses', courseRoutes)
main.use('/enrollments', enrollmentRoutes)
main.use('/users', userRoutes)

module.exports = main
