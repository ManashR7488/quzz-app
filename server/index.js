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
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Routes — mounted by subsequent phases
app.use("/api/auth", authRouter);
app.use("/api/questions", questionsRouter);
app.use("/api/results", resultsRouter);

// Connect to database and start server
(async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`server running: http://localhost:${PORT}`);
  });
})();
