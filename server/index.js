import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import questionsRouter from "./routes/questions.js";
import resultsRouter from "./routes/results.js";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? "https://question-system123.vercel.app" : "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

let isConnected = false;

const connectInServer = async () => {
  try {
    await connectDB();
    // console.log("Database connected successfully");
    isConnected = true;
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectInServer();
    isConnected = true;
  }
  next();
});

// Routes — mounted by subsequent phases
app.use("/api/auth", authRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/results", resultsRouter);

// Connect to database and start server
server.listen(PORT, () => {
  // connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
