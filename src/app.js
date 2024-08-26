    const express = require("express")
    const dotenv = require('dotenv');
    dotenv.config();
    const db = require('./db/conn');
    const bodyParser = require('body-parser');
    const http = require('http');
    const app = express()
    const socketIo = require('socket.io');
    const port = process.env.PORT || 4000
    const Routes = require('./routes/routes');
    const Message = require('./models/message');

    const server = http.createServer(app);

    const io = socketIo(server);


    // app.use(bodyParser.json());
    app.use(express.json());
    app.set('io', io);


    app.post('/test', (req, res) => {
        console.log('Request body:==>', req.body);
        res.send('Body received');
    });

    app.use('/api', Routes);

    io.on('connection', (socket) => {
        console.log('<====== user connected=====>', socket.id);
    
        socket.on('message', async (data) => {
            console.log('message received====>', data);
    
       
            const message = new Message(data);
            await message.save();
    
           
            io.emit('message', data);
        });
    
        socket.on('disconnect', () => {
            console.log('user disconnected====>', socket.id);
        });
    });

    app.listen(port, ()=>{

        console.log(`server is running at ${port}`);
        
    })