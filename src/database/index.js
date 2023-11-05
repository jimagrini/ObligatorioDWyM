const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require ('./routes/admin');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use('/api', adminRoutes);



//Routes
app.get('/', (req, res) => {
    res.send('Hello World! API');
});


//MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error(err);
});

app.listen(port, () => {
    console.log('Listening on port', port);
});