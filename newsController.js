const express = require('express')

const router = express.Router()

router.get('/top-stories', (req, res) => {

  res.send('this is the /top-stories page')
})

module.exports = router