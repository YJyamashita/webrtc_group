const socketio = require('socket.io');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '')));

server = app.listen(3000);

const io = require("socket.io")(server);

const PORT = 3000 || process.env.PORT;
console.log(`Server running on port ${PORT}`);