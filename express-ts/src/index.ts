import express from 'express';
import { createServer } from 'http';
import { Socket } from 'socket.io';
import cardRouter from './routes-socket/cards';

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(express.json());

const io = require('socket.io')(httpServer, {
  cors: { origin: '*' },
});

app.use((req, res, next) => {
  req.app.set('socket', io);
  next();
});

const PORT = 3001;

app.get('/test', (req, res) => {
  console.log('hello world');
  res.send('V 1.1');
});

app.post('/test', (req, res) => {
  const activitiesList = req.body.activities;
  const socket = req.app.get('socket') as Socket; 
  ejecutarjuego(socket, activitiesList);
  res.send('funca');
});

io.on('connection', (socket: any) => {
  console.log('A user connected');

  io.on('disconnect', () => {
    console.log('A user disconnected!');
  });

  io.on('sendActivities', (activities: any) => {
    console.log('Received sendActivities event with activities:', activities);
    ejecutarjuego(activities, 0);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/cards', cardRouter);

function ejecutarjuego(activitieslist: any, pos = 0) {
  if (activitieslist && activitieslist.length && pos < activitieslist.length) {
    const currentActivity = activitieslist[pos];
    io.emit('activityPart', currentActivity);

    setTimeout(() => {
      ejecutarjuego(activitieslist, pos + 1);
      console.log(activitieslist[1].name);
    }, 10000);
  } else {
    io.emit('message', 'fin juego');
}
}