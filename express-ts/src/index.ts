import express from 'express'
import cardRouter from './routes-socket/cards'
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
  ejecutarjuego(0);
  res.send('V 1.1')
})

function ejecutarjuego(pos:number) {
  const listaAct = [1,2,3];
  if (pos < listaAct.length){
    io.emit('message', listaAct[pos])
    setTimeout(() => {
      ejecutarjuego(pos + 1)
    
    }, 3000);
  }else[
    io.emit('message', 'fin juego')
  ]
  
    
}


io.on('connection', (socket: any) => {
    console.log('a user connected');
  
   
  
    socket.on('disconnect', () => {
      console.log('a user disconnected!');
    });

  });

httpServer.listen(PORT);
app.use('/api/cards', cardRouter)

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

