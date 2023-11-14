import express from 'express'
import cardRouter from './routes/cards'
import { createServer } from "http";

const app = express()

//Middleware
app.use(express.json()) 

const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});


const PORT = 3001


app.get('/test', (req, res) => {    
    console.log("hello world");
    res.send('V 1.1')
})
app.post('/test',(req, res) => {
  res.send('V 1.1')
})

function ejecutarjuego(activitieslist : any, pos = 0) {
  if (pos < activitieslist.length) {
    const currentActivity = activitieslist[pos];
    io.emit('activityPart', currentActivity);

    setTimeout(() => {
      ejecutarjuego(activitieslist, pos + 1);
    }, 10000);
  } else {
    io.emit('message', 'fin juego');
  }
}


io.on('connection', (socket: any) => {
    console.log('a user connected');
  
   
  
    socket.on('disconnect', () => {
      console.log('a user disconnected!');
    });

    socket.on('sendActivities', (activities: any) => {
      ejecutarjuego(activities, 0);
    });

  });

httpServer.listen(PORT);
app.use('/api/cards', cardRouter)

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

