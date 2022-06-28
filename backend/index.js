const express = require("express");
// require("dotenv").config();
const connectWithDb = require("./config/db");
const Messages = require("./model/dbMessages");
const Pusher = require("pusher");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

// connection with db
connectWithDb();


// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// pusher config
const pusher = new Pusher({
  appId: "1422046",
  key: "cda07d01e6670a1346ad",
  secret: "f1453c2f6e752f9a448f",
  cluster: "ap2",
  useTLS: true,
});

// connection with pusher
const dbPusher = mongoose.connection;

dbPusher.once("open", async () => {
  // console.log("PUSHER DB CONNECTED");

  const msgCollection = await dbPusher.collection("messagecontents");
  const changeStream = msgCollection.watch().on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

// routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// get messages from database
app.get("/api/v1/messages/sync", async (req, res) => {
  await Messages.find((err, data) => {
    if (err) {
      console.log(`new error: ${err}`);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// add new messages to the database
app.post("/api/v1/messages/new", async (req, res) => {
  const dbMessage = await req.body;
  console.log(dbMessage);

  await Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
      console.log(`new error: ${err}`);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => {
  console.log(`Server is running at PORT ${port}`);
});
