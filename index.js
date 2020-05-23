require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Declare our server

const server = express()

// Declare our Middleware

server.use([helmet(), bodyParser.urlencoded({extended: true}), bodyParser.json(), cors() ]);

// Build our Routes

server.get('/', (req, res) => {
    res.json({api: `I'm ALIVE`})
})

server.post('/api/mail', async (req, res) => {
    try {
        await sgMail.send(req.body)
        res.json({message: 'Success'})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)        
    }
})

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`Server running on PORT:${port}`))
