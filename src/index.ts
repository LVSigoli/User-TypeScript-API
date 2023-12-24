import express from "express";
import { config } from "dotenv";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users";
import { GetUsersController } from "./controllers/getusers/GetUsers";
import { MongoClient } from "./database/mongo";
import { MongoCreatetUsersRepository } from "./repositories/create-users/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";

const main = async () => {
  config();
  const app = express();

  app.use(express.json());
  await MongoClient.connect();

  app.get("/", (req, res) => {
    res.send("Hello, world!");
  });

  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);
    const response = await getUsersController.handle();

    res.status(response.statusCode).send(response.body);
  });

  app.post("/users", async (req, res) => {
    const mongoCreatetUsersRepository = new MongoCreatetUsersRepository();

    const createUserController = new CreateUserController(mongoCreatetUsersRepository);
    const { body, statusCode } = await createUserController.handle({
      body: req.body,
    });
    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 50000;
  app.listen(port, () => console.log(`listenning on ports ${port}`));
};
main();
