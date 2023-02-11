import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static('dist'));

io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on('Game::Create', (args, callback) => {
        callback({
            "errno": 0,
            "message": "success"
        });
    });
    socket.on('disconnect', () => {
        console.log(`Disonnected: ${socket.id}`);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
