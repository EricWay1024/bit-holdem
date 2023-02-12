import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

// load const
import { AdminEvents, RoomEvents, RoomStatus } from './consts.js';

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

    // listen for RoomEvents
    socket.on(RoomEvents.Create, (args, callback) => {
        const id = Math.floor(100000 + Math.random() * 900000).toString();

        // room exists
        if (rooms.findOne({
            "id": {
                "$eq": id
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
            "id": id,
            "admin": socket.id,
            "status": RoomStatus.INIT,
            "players": {},
        });

        // return to client
        socket.join(id);
        callback({
            "errno": 0,
            "message": "success",
            "data": {
                "id": id,
            }
        });
    });
    socket.on(RoomEvents.Join, (args, callback) => {
        if (!args.name || args.name.trim().length === 0) {
            callback({
                "errno": -1,
                "message": "Name invalid.",
            });
            return;
        }

        const room = rooms.findOne({
            "id": {
                "$eq": args.id
            }
        });

        // room not found
        if (!room) {
            callback({
                "errno": -1,
                "message": "Room not found.",
            });
            return;
        }

        room.players[socket.id] = {
            "name": args.name,
            "assets": 1000,
            "isInGame": true,
            "isAllIn": false,
        };

        // return to client
        socket.join(room.id);
        socket.to(room.id).emit(RoomEvents.Feed, `${args.name} joined.`);
        socket.to(room.id).emit(RoomEvents.Update, room);
        callback({
            "errno": 0,
            "message": "success"
        });
    });
    socket.on(RoomEvents.Fetch, (args, callback) => {
        const ids = [];
        for (const id of socket.rooms) {
            if (id !== socket.id) ids.push(id);
        }
        const room = rooms.findOne({
            "id": {
                "$eq": ids[0]
            }
        });

        // room not found
        if (!room) {
            callback({
                "errno": -1,
                "message": "Room not found.",
            });
            return;
        }

        // return to client
        callback({
            "errno": 0,
            "message": "success",
            "data": room,
        });
    });

    socket.on(AdminEvents.StartGame, (args, callback) => {
        const ids = [];
        for (const id of socket.rooms) {
            if (id !== socket.id) ids.push(id);
        }
        const room = rooms.findOne({
            "id": {
                "$eq": ids[0]
            }
        });

        if (room.admin !== socket.id) {
            callback({
                "errno": -1,
                "message": "You are not an admin.",
            });
            return;
        }

        const statusArray = Object.values(RoomStatus);
        const statusIndex = statusArray.indexOf(room.status);
        room.status = statusArray[(statusIndex+1)%statusArray.length];

        socket.to(room.id).emit(RoomEvents.Update, room);

        // return to client
        callback({
            "errno": 0,
            "message": "success",
            "data": room,
        });
    });

    socket.on(AdminEvents.NextState, (args, callback) => {
        const ids = [];
        for (const id of socket.rooms) {
            if (id !== socket.id) ids.push(id);
        }
        const room = rooms.findOne({
            "id": {
                "$eq": ids[0]
            }
        });

        if (room.admin !== socket.id) {
            callback({
                "errno": -1,
                "message": "You are not an admin.",
            });
            return;
        }

        const statusArray = Object.values(RoomStatus);
        const statusIndex = statusArray.indexOf(room.status);
        room.status = statusArray[(statusIndex+1)%statusArray.length];

        socket.to(room.id).emit(RoomEvents.Update, room);

        // return to client
        callback({
            "errno": 0,
            "message": "success",
            "data": room,
        });
    });

    // listen for disconnections
    socket.on('disconnect', () => {
        console.debug(`Disonnected: ${socket.id}`);
        // rooms.findAndUpdate({
        //     "players": {
        //         "$contains": socket.id
        //     }
        // }, (room) => {
        //     room.players = room.players.filter(player => player != socket.id);
        //     io.to(room.id).emit(RoomEvents.Update, room);
        // });
        // players.findAndRemove({
        //     "id": {
        //         "$eq": socket.id
        //     }
        // });
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
    app.use(express.static("./client/build/"));

    // listen for connections
    io.on("connection", onConnection);

    // start server
    server.listen(port, () => {
        console.info(`Listening on ${port}`);
    });
})();
