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

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).send("No token provided");
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
}
module.exports = authenticateToken;

async function run() {
  try {
    const db = client.db("HandsOn");
    const usersCollection = db.collection("users");
    const eventsCollection = db.collection("events");
    const communityHelpsCollection = db.collection("communityHelps");

    app.get("/event/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await eventsCollection.findOne(query);
      res.send(result);
    });

    app.get("/events", async (req, res) => {
      try {
        const { category, location, date, onlyMine } = req.query;
        console.log("Query received:", req.query);
        const query = {};
        if (category) {
          query.category = { $regex: `^${category.trim()}$`, $options: "i" };
        }
        if (location) query.location = { $regex: location, $options: "i" };
        if (date) query.date = new Date(date);
        // Only apply this if 'onlyMine' is true
        if (onlyMine === "true") {
          const authHeader = req.headers["authorization"];
          const token = authHeader && authHeader.split(" ")[1];
          if (!token) {
            return res
              .status(401)
              .json({ message: "Token required for 'onlyMine'" });
          }
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            query["createdBy._id"] = new ObjectId(decoded.id);
          } catch (err) {
            return res.status(403).json({ message: "Invalid token" });
          }
        }
        const result = await eventsCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send({ message: "Failed to fetch events" });
      }
    });

    app.post("/event", authenticateToken, async (req, res) => {
      try {
        const {
          title,
          description,
          category,
          date,
          startTime,
          endTime,
          location,
          maxParticipants,
          requirements,
          image = "",
        } = req.body;
        const user = await usersCollection.findOne({
          _id: new ObjectId(req.user.id),
        });
        const event = {
          title,
          description,
          category,
          date: new Date(date),
          startTime,
          endTime,
          location,
          maxParticipants,
          requirements,
          image,
          createdBy: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          // participants: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await eventsCollection.insertOne(event);
        res.status(201).send({
          message: "Event created successfully",
          eventId: result.insertedId,
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });

    app.put("/event/:id", authenticateToken, async (req, res) => {
      try {
        const eventId = req.params.id;
        // Validate ObjectId
        if (!ObjectId.isValid(eventId)) {
          return res.status(400).json({ message: "Invalid Event ID" });
        }
        // Build query with nested createdBy._id match
        const query = {
          _id: new ObjectId(eventId),
          "createdBy._id": new ObjectId(req.user.id),
        };
        // Build update document
        const updateDoc = {
          $set: {
            ...req.body,
            updatedAt: new Date(),
          },
        };
        const result = await eventsCollection.updateOne(query, updateDoc);
        if (result.matchedCount === 0) {
          return res
            .status(403)
            .json({ message: "You are not authorized to update this event." });
        }
        res.json({ success: true, message: "Event updated", result });
      } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({ message: "Failed to update event" });
      }
    });

    app.post("/event/:id/join", authenticateToken, async (req, res) => {
      try {
        const eventId = req.params.id;
        const userId = req.user.id;

        // Check valid ObjectId
        if (!ObjectId.isValid(eventId)) {
          return res.status(400).json({ message: "Invalid Event ID" });
        }

        const event = await eventsCollection.findOne({
          _id: new ObjectId(eventId),
        });
        if (!event) {
          return res.status(404).json({ message: "Event not found" });
        }

        // Prevent joining if already a participant
        const alreadyJoined = event.participants?.includes(userId);
        if (alreadyJoined) {
          return res
            .status(400)
            .json({ message: "You have already joined this event." });
        }
        // Check if event is full
        if (event.participants?.length >= event.maxParticipants) {
          return res.status(400).json({ message: "This event is full." });
        }

        // Add user to participants array
        await eventsCollection.updateOne(
          { _id: new ObjectId(eventId) },
          {
            $push: { participants: userId },
            $set: { updatedAt: new Date() },
          }
        );

        res.status(200).json({
          success: true,
          message: "You have successfully joined the event.",
        });
      } catch (error) {
        console.error("Error joining event:", error);
        res.status(500).json({ message: "Failed to join event" });
      }
    });

    app.post("/event/:id/leave", authenticateToken, async (req, res) => {
      const eventId = req.params.id;
      const userId = req.user.id;

      try {
        const event = await eventsCollection.findOne({
          _id: new ObjectId(eventId),
        });

        if (!event) return res.status(404).send({ message: "Event not found" });

        // Check if user is already a participant
        if (!event.participants.includes(userId)) {
          return res
            .status(400)
            .send({ message: "You are not a participant of this event." });
        }

        const result = await eventsCollection.updateOne(
          { _id: new ObjectId(eventId) },
          { $pull: { participants: userId } }
        );

        res
          .status(200)
          .send({ message: "Successfully left the event", result });
      } catch (error) {
        console.error("Leave event error:", error);
        res.status(500).send({ message: "Failed to leave event" });
      }
    });

    app.delete("/event/:id", authenticateToken, async (req, res) => {
      try {
        const eventId = req.params.id;
        const userId = req.user.id;
        // Convert to ObjectId for query
        const query = {
          _id: new ObjectId(eventId),
          "createdBy._id": new ObjectId(userId), // match nested _id inside createdBy
        };
        const event = await eventsCollection.findOne(query);
        if (!event) {
          return res.status(404).json({
            success: false,
            message: "Event not found or you're not authorized to delete it.",
          });
        }
        const result = await eventsCollection.deleteOne({
          _id: new ObjectId(eventId),
        });
        res.status(200).json({
          success: true,
          message: "Event deleted successfully",
          result,
        });
      } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({
          success: false,
          message: "Failed to delete event",
        });
      }
    });

    app.get("/helps", async (req, res) => {
      const result = await communityHelpsCollection.find().toArray();
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
