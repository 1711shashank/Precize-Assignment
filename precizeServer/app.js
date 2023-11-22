
// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // Choose your desired port

var cors = require("cors");
const { deleteData, updateScore, insertData, viewData, getRank } = require('./src/controller/userController');

app.use(bodyParser.json());
app.use(cors({ origin: '*', optionsSuccessStatus: 200, credentials: true }));
app.options("*", cors({ origin: true, optionsSuccessStatus: 200, credentials: true }));
app.use(express.json());

app.options("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(204);
});

app.get('/view', viewData);
app.post('/insert', insertData);
app.get('/get-rank/:name', getRank);
app.delete('/delete/:name', deleteData);
app.put('/update-score/:name', updateScore);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
