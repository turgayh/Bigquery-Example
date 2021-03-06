
const morgan = require('morgan')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const errorHandler = require('./src/middleware/error-handler')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('combined'))

// api routes
app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

app.use('/api/v1/event', require('./src/event/event.controller'))
app.use('/api/v1/crm/user-stat', require('./src/crm/user-stat.controller'))
app.use('/api/v1/crm/daily-stat', require('./src/crm/daily-stat.controller'))

// global error handler
app.use(errorHandler)

// start server
app.listen(process.argv[2] || process.env.PORT || 4500, () => {
    console.log(`Uygulama ayakta ve ${process.argv[2] || process.env.PORT || 4500} nolu porttan dinlemede.`)
})
