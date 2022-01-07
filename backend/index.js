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
const { Server } = require("socket.io");
const { authorize } = require("passport.socketio");
const cookieParser = require('cookie-parser');

database.cnctDB('shopping')
const listDB = require('./db/listDB')

passport.setup(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api", require('./routes/auth'))

const server = http.createServer(app);
const io = new Server().listen(server);

io.use(
    authorize({
        cookieParser: cookieParser,
        key: 'connect.sid',
        secret: process.env.SECRET || 'keyboard cat',
        store: passport.store
    })
);


io.on('connection', (socket) => {
    socket.on('sync', async (data) => {
        console.log("Requested sync for list: " + data.list)

        let diff = false

        if (data.data.listItems != null) {
            let serverList = await listDB.getListItems(data.list)

            let clientList = data.data.listItems

            for (let index = 0; index < clientList.length; index++) {
                const element = clientList[index];
                // Check if element.id exists in serverList
                let sharedIndex = -1
                for (let i = 0; i < serverList.length; i++) {
                    if (serverList[i]._id.toString() == element._id) {
                        sharedIndex = i
                        break
                    }
                }
                if (sharedIndex !== -1) {
                    const serverBought = serverList[sharedIndex].bought
                    const clientBought = element.bought

                    if (!serverBought && clientBought) {
                        await listDB.buyListItem(data.list, element._id)
                        diff = true
                    }
                }
            }

        }
        if(diff) {
            io.emit('syncBack', await listDB.getListItems(data.list))
        } else {
            socket.emit('syncBack', await listDB.getListItems(data.list))
        }
        
    });

    socket.on('add', async (data) => {
        console.log("Requested add of " + data.name + " to list: " + data.list)
        await listDB.addListItem(data.list, data.name)
        io.emit('syncBack', await listDB.getListItems(data.list))
    });

    socket.on('remove', async (data) => {
        console.log("Requested remove of " + data.id + " from list: " + data.list)
        await listDB.removeListItem(data.list, data.id)
        io.emit('syncBack', await listDB.getListItems(data.list))
    });

    socket.on("buy", async (data) => {
        console.log("Requested buy of " + data.id + " from list: " + data.list)
        await listDB.buyListItem(data.list, data.id)
        io.emit('syncBack', await listDB.getListItems(data.list))
    });

    socket.on("unbuy", async (data) => {
        console.log("Requested unbuy of " + data.id + " from list: " + data.list)
        await listDB.unbuyListItem(data.list, data.id)
        io.emit('syncBack', await listDB.getListItems(data.list))
    });
});

//Configure Express for Vue History Mode
app.use(history());

//Adds VueJS build
app.use('/', express.static(path.join(path.resolve(), '../frontend/dist')));

server.listen(port, () => {
    console.log(`\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m`)
});

const testItems = [{ name: "Mjölk", id: 1, bought: true }, { name: "Mjöl", id: 2, bought: false }, { name: "Brölk", id: 3, bought: true }, { name: "Red Bull", id: 4, bought: false }, { name: "Tomatsoppa", id: 5, bought: false }, { name: "Köttfri köttfärs", id: 6, bought: false }]

/*testItems.forEach(item => {
    listDB.addListItem("familj", item.name)
});*/