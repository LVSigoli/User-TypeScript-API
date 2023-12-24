import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { CreateUserParams, ICreateUserController, iCreateUserRepository } from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: iCreateUserRepository) {}
  async handle(httprequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
    try {
      //verificar campos aleatorios
      const requiredFields = ["fistName", "lastName", "email", "password"];
      for (const field of requiredFields)
        if (!httprequest?.body[field as keyof CreateUserParams]?.length) {
          return { statusCode: 400, body: "Field is required" };
        }

      const user = await this.createUserRepository.createUser(httprequest.body);
      return { statusCode: 2001, body: user };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
