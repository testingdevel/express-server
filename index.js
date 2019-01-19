const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const router = express.Router()

router.get('/shows', (req, res) => res.send('Shows'))
router.get('/hosts', (req, res) => res.send('Hosts'))

app.get('/', (req, res) => res.send('Welcome to the root route'))

app.use('/api/v1', router)

app.listen(port, () => console.log(`Server is listening on port ${port}`))