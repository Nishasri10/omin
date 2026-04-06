import { Server } from 'socket.io';

let io;

export const initSocket = server => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', socket => {
    socket.on('joinStore', storeId => {
      if (storeId) socket.join(storeId);
    });
  });

  return io;
};

export const emitToStore = (storeId, event, payload) => {
  if (!io) return;
  if (storeId) io.to(storeId.toString()).emit(event, payload);
};
