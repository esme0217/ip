const login = require('./helpers/login');
require('dotenv').config();
const express = require('express');
const device = require('express-device');

const app = express();
const port = process.env.PORT;

app.use(device.capture());

app.get('/', async (req, res) => {

    await login.infoBrowser(req); 
    res.json(obj);

});

app.listen(port, () => {
    console.clear();
    console.log(`Listen server http://localhost:${port}`);
});
