const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const mongoose = require('mongoose');

require('dotenv/config');

const app = express();
const cors = require('cors');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// app.use('/', routesHandler);
app.use(cors());
app.post('/postForm/:userid', routesHandler);
app.post('/addList/:userid', routesHandler);
app.get('/lists/:userid', routesHandler);
app.get('/list/:id', routesHandler)
app.get('/scrape/:url', routesHandler);
app.get('/games', routesHandler);
app.get('/games/:listId', routesHandler);
app.post('/addGame/:id', routesHandler);
app.put('/updateScore/:gameId', routesHandler);
app.delete('/delete/:id', routesHandler);
app.post('/users/', routesHandler);

//DB Connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => {
    console.log('DB Connected.');
})
.catch( (err) => {
    console.log(err);
});

const PORT = process.env.PORT || 4000; // backend routing port
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;
