// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const app = express();
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const port = process.env.PORT || 5000;

// const corsOptions = {
//   origin: ["http://localhost:5173"],
//   Credential: true,
//   optionSuccessStatus: 200,
// };

// // middleware
// app.use(cors(corsOptions));
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s3zryfx.mongodb.net/?appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Database collections are here
//     const usersCollection = client.db("HandsOn").collection("users");
//     const eventsCollection = client.db("HandsOn").collection("events");
//     const communityHelpsCollection = client
//       .db("HandsOn")
//       .collection("communityHelps");

//     // get all event data in db
//     app.get("/events", async (req, res) => {
//       const cursor = eventsCollection.find();
//       const result = await cursor.toArray();
//       res.send(result);
//     });

//     // get all community data in db
//     app.get("/helps", async (req, res) => {
//       const cursor = communityHelpsCollection.find();
//       const result = await cursor.toArray();
//       res.send(result);
//     });

//     //  Get a single event from db using event id
//     app.get("/event/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await eventsCollection.findOne(query);
//       res.send(result);
//     });

//     app.put("/event/:id", async (req, res) => {
//       const id = req.params.id;
//       const eventData = req.body;
//       const query = { _id: new ObjectId(id) };
//       const options = { upsert: true };
//       const updateDoc = {
//         $set: {
//           ...eventData,
//         },
//       };
//       const result = await eventsCollection.updateOne(
//         query,
//         updateDoc,
//         options
//       );
//       res.send(result);
//     });

//     // Delete a single event from bd
//     app.delete("/event/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await eventsCollection.deleteOne(query);
//       res.send(result);
//     });

//     // Delete a single help post from bd
//     app.delete("/help/:id", async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await communityHelpsCollection.deleteOne(query);
//       res.send(result);
//     });

//     // all database data get api are down below
//     // Save single communityHelps data in db
//     app.post("/help", async (req, res) => {
//       const helpData = req.body;
//       console.log(helpData);
//       const result = await communityHelpsCollection.insertOne(helpData);
//       res.send(result);
//     });

//     // Save single event data in db
//     app.post("/event", async (req, res) => {
//       const eventData = req.body;
//       console.log(eventData);
//       const result = await eventsCollection.insertOne(eventData);
//       res.send(result);
//     });

//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//   }
// }
// run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("HandsOn server is running");
// });

// app.listen(port, () => {
//   console.log(`HandsOn server is running on port ${port}`);
// });

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
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

// Auth middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
}

async function run() {
  try {
    const db = client.db("HandsOn");
    const usersCollection = db.collection("users");
    const eventsCollection = db.collection("events");
    const communityHelpsCollection = db.collection("communityHelps");

    app.get("/events", async (req, res) => {
      const result = await eventsCollection.find().toArray();
      res.send(result);
    });

    app.get("/helps", async (req, res) => {
      const result = await communityHelpsCollection.find().toArray();
      res.send(result);
    });

    app.get("/event/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await eventsCollection.findOne(query);
      res.send(result);
    });

    app.put("/event/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const updateDoc = { $set: { ...req.body } };
      const result = await eventsCollection.updateOne(query, updateDoc, {
        upsert: true,
      });
      res.send(result);
    });

    app.delete("/event/:id", async (req, res) => {
      const result = await eventsCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.delete("/help/:id", async (req, res) => {
      const result = await communityHelpsCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.post("/help", async (req, res) => {
      const result = await communityHelpsCollection.insertOne(req.body);
      res.send(result);
    });

    app.post("/event", async (req, res) => {
      const result = await eventsCollection.insertOne(req.body);
      res.send(result);
    });

    app.post("/register", async (req, res) => {
      const {
        name,
        email,
        password,
        skills = [],
        supported_causes = [],
      } = req.body;
      try {
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser)
          return res.status(400).send({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection.insertOne({
          name,
          email,
          password: hashedPassword,
          skills,
          supported_causes,
          joined_events: [],
          createdAt: new Date(),
        });

        res.status(201).send({
          message: "User registered successfully",
          userId: result.insertedId,
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });

    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await usersCollection.findOne({ email });
        if (!user) return res.status(400).send({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          return res.status(401).send({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.send({
          message: "Login successful",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            skills: user.skills,
            supported_causes: user.supported_causes,
          },
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });

    app.get("/me", verifyToken, async (req, res) => {
      try {
        const user = await usersCollection.findOne(
          { _id: new ObjectId(req.userId) },
          { projection: { password: 0 } }
        );
        res.send(user);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. successfully connected to MongoDB!");
  } finally {
    // client.close(); // optional in production
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("HandsOn server is running");
});

app.listen(port, () => {
  console.log(`HandsOn server is running on port ${port}`);
});
