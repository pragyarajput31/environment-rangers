import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import morgan from "morgan";
import connectDb from "./mongoBase/db.js";
const app = express();
connectDb();
dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors("*"));

// Custom middleware to handle CORS preflight requests
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   if (req.method === "OPTIONS") {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "OOPS Project server is running" });
});

const PORT = process.env.PORT || 5000; // Set a default port if PORT environment variable is not set

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));

