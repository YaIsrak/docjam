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
		console.log('User connected:', socket.id);
	});

	// FIXED wildcard route
	server.use((req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	});

	httpServer.listen(port, () => {
		console.log(`Ready at http://${hostname}:${port}`);
	});
});
