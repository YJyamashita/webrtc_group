const socketio = require('socket.io');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '')));

server = app.listen(3000);

const io = require("socket.io")(server);

const PORT = 3000 || process.env.PORT;
console.log(`Server running on port ${PORT}`);
var userConnection = [];

io.on('connection', (socket) => {
	socket.on('users_info_to_signaling_server', (data) => {
		var other_users = userConnection.filter(p => p.meeting_id == data.meetingid);
		userConnection.push({
			connectionId: socket.id,
			user_id: data.current_user_name,
			meeting_id: data.meetingid
		})
		console.log(`all users: ${userConnection.map(a => a.connectionId)}`);
		console.log(`other users: ${other_users.map(a => a.connectionId)}`);

		other_users.forEach(v => {
			socket.to(v.connectionId).emit('other_users_to_inform', {
				other_user_id: data.current_user_name,
				connId: socket.id
			})
		});
		socket.emit('newConnectionInformation', other_users);
	})
})