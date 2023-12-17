import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/getusers/GetUsers";
import { MongoClient } from "./database/mongo";

const main = async () => {
  config();
  const app = express();
  await MongoClient.connect();

  app.get("/", (req, res) => {
    res.send("Hello, world!");
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const response = await getUsersController.handle();

    res.send(response.body).status(response.statusCode);
  });

  const port = process.env.PORT || 50000;
  app.listen(port, () => console.log(`listenning on ports ${port}`));
};
main();
