const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const corsOptions = {
    origin: ['http://localhost:3000', 'https://dema-automotive-95e44bfb4ebf.herokuapp.com/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
  
app.use(cors(corsOptions));

const database_init = require('./src/database/mongodb');

database_init();

app.use("/dema", require("./src/server"));

const port = 3030;

app.listen(port, () => {
    console.log("Listen on port: " + port);
});
