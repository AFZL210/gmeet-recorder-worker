import dotenv from "dotenv";
import express from "express";
import recordController from "./api/record_controller";

dotenv.config();
const app = express();
const SERVER_PORT = process.env.SERVER_PORT!;

app.use(express.json());

app.use("/api", recordController);

app.listen(SERVER_PORT, () => {
  console.log("Server running on PORT: ", SERVER_PORT);
});
