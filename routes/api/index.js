const router = require('express').Router()
const userRouter = require('./user-routes')
const thoughtRoutes = require('./thought-routes')
router.use('/users', userRouter)
router.use('/thoughts', thoughtRoutes)

module.exports = router