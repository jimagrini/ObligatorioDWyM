const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('mensajeDesdeCliente', (mensaje) => {
    console.log('Mensaje desde el cliente:', mensaje);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(4200, () => {
  console.log('Servidor de WebSocket iniciado en el puerto 4200');
});