import { Server } from 'socket.io';

const initSocketServer = (server) => {
	const io = new Server(server, {
		cors: {
			origin: '*',
		},
	});

	io.on('connection', (socket) => {
		// eslint-disable-next-line no-console
		console.log('A user connected');

		socket.on('drawing', (data) => {
			socket.broadcast.emit('drawing', data);
		});

		socket.on('disconnect', () => {
			// eslint-disable-next-line no-console
			console.log('User disconnected');
		});
	});

	return io;
};

module.exports = initSocketServer;
