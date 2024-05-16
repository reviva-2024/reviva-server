const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const baseRoutes = require("./baseRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
const corsOptions = {
  origin: "*",
};

//add static uploads folder
app.use(express.static("uploads"));

app.use(cors(corsOptions));
app.use(express.static("uploads"));

//base routes
app.use("/api/v0", baseRoutes);
app.get("/", (req, res) => {
  res.send("<h1>:)</h1>");
});

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // to check connection successful or not
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error While Connecting To MongoDb", error);
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
connectDb();
