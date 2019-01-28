const express = require('express')
const app = express()
const enController = require('./enControllers/enController')
const frController = require('./frControllers/frController')

const router = express.Router()

router.use('/en', enController)
router.use('/fr', frController)

module.exports = router