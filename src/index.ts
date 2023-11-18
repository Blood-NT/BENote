
import express from 'express';
import router from './routes';
import cors from "cors";

const app = express();
const port = 8083;
app.use(cors({ origin: "*", methods: "*", optionsSuccessStatus: 200 }));

app.use(express.json());

app.use(router)

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
