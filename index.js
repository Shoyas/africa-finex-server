const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();


app.use(bodyParser.json());
app.use(cors());
app.use(express());

const port = 5000;

app.get("/", (req, res) => {
    res.send("Database is connected...");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0wqac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, });
client.connect(err => {
  const buyCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.BD_COLLECTION_1}`);
  const sellCollection = client.db(`${process.env.DB_NAME}`).collection(`${process.env.BD_COLLECTION_2}`);
  
  // This coding is for storing buy documentation 
  app.post("/buy", (req, res) => {
    const buyOne = req.body;
    buyCollection.insertOne(buyOne)
    .then((result) => {
        res.send(result.insertedCount > 0);
    });
  });
  // Ends of buy coding

  // This coding is for storing sell documentation
  app.post("/sell", (req, res) => {
    const sellOne = req.body;
    sellCollection.insertOne(sellOne)
    .then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  // Ends of sell coding

  
});


app.listen(process.env.PORT || port)