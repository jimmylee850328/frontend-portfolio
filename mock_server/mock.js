http = require('http');
url = require('url');

var host = '127.0.0.1';
var port = 23456;

var cors = require('cors');
var express = require('express');

var app = express();
app.use(cors());

var session = require('express-session');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let get_data_0 = require('./infinite-scroll-data/get_data_0.json');
let get_data_1 = require('./infinite-scroll-data/get_data_1.json');
let get_data_2 = require('./infinite-scroll-data/get_data_2.json');
let get_data_3 = require('./infinite-scroll-data/get_data_3.json');
let get_data_4 = require('./infinite-scroll-data/get_data_4.json');

app.use(express.json({ limit: '81mb' } )); // support json encoded bodies
app.use(express.urlencoded({ extended: true, limit: '81mb' })); // support encoded bodies
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use('/get_products/', async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Request-Method', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    await sleep(3000);
    if (req.body.count == 0) {
        res.send(get_data_0);
    } else if (req.body.count == 1) {
        res.send(get_data_1);
    } else if (req.body.count == 2) {
        res.send(get_data_2);
    } else if (req.body.count == 3) {
        res.send(get_data_3);
    } else if (req.body.count == 4) {
        res.send(get_data_4);
    }
});

app.listen(port, (err) => {
    if (err) {
        return console.log('bad');
    }
});