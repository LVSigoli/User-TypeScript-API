import { IGetUsersRepository } from "../../controllers/getusers/GetUsersProtocols";
import { User } from "../../models/user";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        firtsName: "Lucas",
        lastName: "Sigoli",
        email: "lucasviniciussigoli@gmail.com",
        password: "22121104",
      },
    ];
  }
}
