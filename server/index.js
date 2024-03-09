const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DataModel = require('./models/Data');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://lavakumar9877:Lav%409877@cluster0.qbrgzki.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });


app.post('/register', (req, res) => {
    DataModel.create(req.body)
        .then(information => res.json(information))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/retrieve', (req, res) => {
    DataModel.find()
        .then(information => res.json(information))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/api/data/:uniqueId', (req, res) => {
    const uniqueId = req.params.uniqueId;
    DataModel.findOne({ uniid: uniqueId })
        .then(data => {
            if (!data) {
                return res.status(404).json({ error: 'Data not found' });
            }
            res.json(data);
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});