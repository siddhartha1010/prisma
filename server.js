import express from "express";
import userRoutes from "./routes/userRoutes.js";
import profileRouters from "./routes/profileRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import postrouter from "./routes/postRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const PORT = 9000;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", profileRouters);
app.use("/api", postrouter);
app.use("/api", commentRoutes);
app.use("/api", groupRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
