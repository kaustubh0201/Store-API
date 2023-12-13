require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFoundMiddleware= require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

app.use(express.json());

app.get('/', (request, response) => {
    response.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_URI);
        console.log("Connected to the database.");
        app.listen(port, console.log(`Server is listening on port ${port}.`));
    } catch (error) {
        console.log(error);
    }
};

start();