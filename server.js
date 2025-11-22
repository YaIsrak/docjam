import express from 'express';
import { createServer } from 'http';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
	const server = express();
	const httpServer = createServer(server);
	const io = new SocketIOServer(httpServer, {
		cors: {
			origin: '*',
		},
	});

	io.on('connection', (socket) => {
		console.log('👤 User connected:', socket.id);

		socket.on('cursor-move', (data) => {
			socket.broadcast.emit('cursor-update', {
				id: socket.id,
				...data,
			});
		});

		socket.on('drawing', async (data) => {
			try {
				const response = await fetch(
					`http://${hostname}:${port}/api/drawing`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
					},
				);

				if (!response.ok) {
					throw new Error(
						`API request failed with status ${response.status}`,
					);
				}

				socket.broadcast.emit('drawing', data.drawingAction);
			} catch (error) {
				console.error('Failed to save drawing:', error);
			}
		});

		socket.on('disconnect', () => {
			console.log('⛔ User disconnected:', socket.id);
			io.emit('cursor-remove', socket.id);
		});
	});

	server.use((req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	});

	httpServer.listen(port, () => {
		console.log(`Ready at http://${hostname}:${port}`);
	});
});
