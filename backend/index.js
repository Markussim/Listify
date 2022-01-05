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
const database = require('./db/database')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { path: '/api/socket.io' });

database.cnctDB('shopping')
const listDB = require('./db/listDB')

passport.setup(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api", require('./routes/auth'))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//Configure Express for Vue History Mode
app.use(history());

//Adds VueJS build
app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));



app.listen(port, () => {
    console.log(`\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`)
});

const testItems = [{ name: "Mjölk", id: 1, bought: true }, { name: "Mjöl", id: 2, bought: false }, { name: "Brölk", id: 3, bought: true }, { name: "Red Bull", id: 4, bought: false }, { name: "Tomatsoppa", id: 5, bought: false }, { name: "Köttfri köttfärs", id: 6, bought: false }]

/*testItems.forEach(item => {
    listDB.addListItem("familj", item.name)
});*/