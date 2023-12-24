import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { CreateUserParams, iCreateUserRepository } from "./protocols";

export class MongoCreateUser implements iCreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db.collection("user").insertOne(params);
    const user = await MongoClient.db.collection<Omit<User, "id">>("users").findOne({ _id: insertedId });

    if (!user) {
      throw new Error("user not created");
    }
    const { _id, ...rest } = user;
    return { id: _id.toHexString(), ...rest };
  }
}
