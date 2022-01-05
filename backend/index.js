// Import .env
require('dotenv').config();

const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const ip = require('ip')
const passport = require('./passport')
const history = require('connect-history-api-fallback')
const path = require('path')

passport.setup(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api", require('./routes/auth'))

//Configure Express for Vue History Mode
app.use(history());

//Adds VueJS build
app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

app.listen(port, () => {
    console.log(`\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`)
});