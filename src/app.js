import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

// load const
import { RoomEvents } from './consts.js';

// load dotenv
import * as dotenv from 'dotenv';
dotenv.config();

// init database
import loki from 'lokijs';
const db = new loki("loki.db");
const rooms = db.addCollection('rooms');
const players = db.addCollection('players');

// define onConnection
const onConnection = (socket) => {
    console.debug(`Connected: ${socket.id}`);
    
    players.insert({
        "id": socket.id,
        "assets": NaN,
    });

    // listen for RoomEvents
    socket.on(RoomEvents.Create, (args, callback) => {
        const roomId = Math.floor(100000 + Math.random() * 900000).toString();

        // room exists
        if (rooms.findOne({
            "id": {
                "$eq": roomId
            }
        })) {
            callback({
                "errno": -1,
                "message": "Failed to create a room. Please try again.",
            });
            return;
        }

        // insert into database
        rooms.insert({
            "id": String,
            "admin": String,
            "status": String,
            "button": String,
            "players": Array,
            "queue": Array,
        });

        // return to client
        socket.join(roomId);
        callback({
            "errno": 0,
            "message": "success",
            "data": {
                "id": roomId,
            }
        });
    });
    socket.on(RoomEvents.Join, (args, callback) => {
        // TODO
        callback({
            "errno": 0,
            "message": "success"
        });
    });
    socket.on(RoomEvents.Quit, (args, callback) => {
        // TODO
        callback({
            "errno": 0,
            "message": "success"
        });
    });

    // listen for disconnections
    socket.on('disconnect', () => {
        console.debug(`Disonnected: ${socket.id}`);
        rooms.findAndUpdate({
            "players": {
                "$contains": socket.id
            }
        }, (room) => {
            room.players = room.players.filter(player => player != socket.id);
            io.to(room.id).emit(RoomEvents.Update, room);
        });
        players.findAndRemove({
            "id": {
                "$eq": socket.id
            }
        });
    });
};

// define main
(() => {
    // load config
    const port = process.env.BIT_HOLDEM_PORT || 3000;

    // init server
    const app = express();
    const server = createServer(app);
    const io = new Server(server);

    // serve static files
    app.use(express.static("dist"));

    // listen for connections
    io.on("connection", onConnection);

    // start server
    server.listen(port, () => {
        console.info(`Listening on ${port}`);
    });
})();
