const express = require('express')
const router = express.Router()

router.use('/stocks', require('./stocks'))

router.use([
  function({ status = 400, message = 'Unknown Error' }, _req, res, _next) {
    res.status(status).json({ message })
  },
])

module.exports = router
