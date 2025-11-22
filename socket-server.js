import { Server } from 'socket.io';

const initSocketServer = (server) => {
	const io = new Server(server, {
		cors: {
			origin: '*',
		},
	});

	io.on('connection', (socket) => {
		console.log('A user connected');

		socket.on('drawing', (data) => {
			socket.broadcast.emit('drawing', data);
		});

		socket.on('disconnect', () => {
			console.log('User disconnected');
		});
	});

	return io;
};

module.exports = initSocketServer;
