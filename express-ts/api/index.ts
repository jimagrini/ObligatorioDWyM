import express from 'express';
import mongoose from 'mongoose';
import adminRouter from './routes/admin';
import proposalRouter from './routes/proposal';
import activityRouter from './routes/activity';
import gameRouter from './routes/game';

require('dotenv').config();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST"
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use('/api/admins', adminRouter);
app.use('/api/activities', activityRouter);
app.use('/api/proposals', proposalRouter);
app.use('/api/games', gameRouter);


// Routes
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!');
});

//mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log('Node API app is running on port', port);
        });
    })
    .catch((err) => console.error(err));
