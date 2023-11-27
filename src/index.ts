
import express from 'express';
import router from './routes';
import cors from "cors";
import http from 'http';
import { Server, Socket } from 'socket.io';
import { createContentService } from './service/contentService';


const app = express();
const port = 8083;
app.use(cors({ origin: "*", methods: "*", optionsSuccessStatus: 200 }));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});



io.on('connection', (socket: Socket) => {

    socket.on('updateNote', (data) => {
        if (data.nid === 3) {
            io.to(`note-${data.nid}`).emit('noteUpdated', data);
            console.log("update", data);
        }
    });

    socket.on('joinNoteRoom', (noteId) => {
        // Tham gia vào một room cụ thể cho id ghi chú
        socket.join(`note-${noteId}`);
        console.log("join", noteId);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    
});





app.use(express.json());

app.use(router)

httpServer.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});