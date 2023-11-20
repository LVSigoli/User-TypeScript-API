import express from "express";
import { config } from "dotenv";

config();

const app = express();

const port = process.env.PORT || 50000;
app.listen(port, () => console.log(`listenning on ports ${port}`));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
