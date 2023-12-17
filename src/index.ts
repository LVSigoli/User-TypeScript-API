import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/getusers/GetUsers";

config();

const app = express();

const port = process.env.PORT || 50000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/users", async (req, res) => {
  const mongoGetUsersRepository = new MongoGetUsersRepository();
  const getUsersController = new GetUsersController(mongoGetUsersRepository);
  const response = await getUsersController.handle();

  res.send(response.body).status(response.statusCode);
});

app.listen(port, () => console.log(`listenning on ports ${port}`));
