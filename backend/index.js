const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://localhost:5173"],
  Credential: true,
  optionSuccessStatus: 200,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s3zryfx.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Database collections are here
    const eventsCollection = client.db("HandsOn").collection("events");

    // Save single event data in db
    app.post("/event", async (req, res) => {
      const eventData = req.body;
      console.log(eventData);
      const result = await eventsCollection.insertOne(eventData);
      res.send(result);
    });

    // get all event data in db
    app.get("/events", async (req, res) => {
      const result = await eventsCollection.find().toArray();
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("HandsOn server is running");
});

app.listen(port, () => {
  console.log(`HandsOn server is running on port ${port}`);
});
