import { Server } from 'socket.io';
import http from 'http';

const onlineUsers = new Map<number, string>();

export const setupSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('user_online', (userId: number) => {
      onlineUsers.set(userId, socket.id);
      io.emit('users_online', Array.from(onlineUsers.keys()));
    });

    socket.on('send_message', (data: { senderId: number; recipientId: number; message: string }) => {
      const recipientSocketId = onlineUsers.get(data.recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receive_message', {
          senderId: data.senderId,
          message: data.message,
          timestamp: new Date(),
        });
      }
    });

    socket.on('new_post', (data: { userId: number; post: any }) => {
      io.emit('post_created', data);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit('users_online', Array.from(onlineUsers.keys()));
    });
  });

  return io;
};
