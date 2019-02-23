const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

// set up MongoDB
let db;

MongoClient.connect('mongodb://localhost:27017/quibbles', (err, client) => {
    if (err) return console.log(err);
    db = client.db('quibbles') // Our DB name

    app.post('/quibbles', (req, res) => {
        db.collection('quibbles').save(req.body, (err, result) => {
            if (err) return console.log(err);

            console.log('saved to database');
            res.redirect('/test');
        })
    });

    // Make sure we are connected to MongoDB before serving
    app.listen(3000, () => {
        console.log('listening on port 3000');
    });
})

// body-parser must come before CRUD handlers
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

