const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();
const connectDB = require('./config/db');
const PORT = 4000;
const server = require('http').Server(app);
const cors = require('cors');
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on('connection', socket => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
    socket.on('join_room', room=>{
      socket.join(room);
      console.log(room)
    })
    socket.on("send_message", ({room, message}) =>{
      io.in(room).emit('recive_messege', message);
      //io.emit('recive_messege', data)
      console.log(message,room)
    })
});

app.use('/api/users', require('./routes/userRoutes'));


app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});


app.use(errorHandler);
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


