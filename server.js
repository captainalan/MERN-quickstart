const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const Data = require("./data");

const API_PORT = 2999;
const app = express();
const router = express.Router();

app.use(cors()) // Temporary fix to cross origin request restriction

// path to MongoDB database
const dbRoute = 'mongodb://localhost:27017/quibbles';

// connects our back end code with the database
mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// logging with morgan
app.use(logger("dev"));

// CREATE of CRUD
// adds new data to our database
router.post("/postData", (req, res) => {
    let data = new Data();

    const { id, name, title, quibble} = req.body;

    if ((!id && id !== 0) || !name || !title || !quibble) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }

    data.id = id;
    data.name = name;
    data.title = title;
    data.quibble = quibble;

    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// READ of CRUD
// fetch all available data in our database
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: true, data: data });
        return res.json({ success: true, data: data});
    });
});

// UPDATE of CRUD
// overwrites existing data in our database
router.put("/updateData", (req, res) => {
    const { id, update } = req.body;
    console.log(`id: ${id}, update: ${update}`); // For debugging
    Data.findOneAndUpdate( {_id: id }, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true});
    });
});

// DELETE of CRUD
// removes existing data in our database
router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// append /api for our http requests
app.use("/api", router);

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

// launch our backend into a port
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));