import express from 'express'
import cardRouter from './routes-socket/cards'
import { createServer } from "http";

const app = express()

//Middleware
app.use(express.json()) 

const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin: '*'}
});


const PORT = 3001


app.get('/test', (req, res) => {    
    console.log("hello world");
    res.send('V 1.1')
})
app.post('/test', (req, res) => {
  const activitiesList = req.body.activities;
  ejecutarjuego(io, activitiesList);
  res.send('funca');
});

io.on('connection', (socket: any) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected!');
  });

  socket.on('sendActivities', (activities: any) => {
    console.log('Received sendActivities event with activities:', activities);
    ejecutarjuego(socket, activities, 0);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/cards', cardRouter);

function ejecutarjuego(socket: any, activitieslist: any, pos = 0) {
  if (activitieslist && activitieslist.length && pos < activitieslist.length) {
    const currentActivity = activitieslist[pos];
    io.emit('activityPart', currentActivity);
    socket.emit('activityPart', currentActivity); 

    setTimeout(() => {
      ejecutarjuego(socket, activitieslist, pos + 1);
      console.log(activitieslist[1].name);
    }, 10000);
  } else {
    io.emit('message', 'fin juego');
    socket.emit('message', 'fin juego'); 
}
}