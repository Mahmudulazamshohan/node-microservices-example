import UserModel from "../models/user/user.model";
import faker from "faker";
import SeederInterface from "../utils/interfaces/seeder.interface";
import { debugPrint } from "../helpers";
import { Hash } from "../utils/hash";

class UserSeeders implements SeederInterface {
  create(): object[] {
    return Array.from(Array(10)).map((v, k) => {
      return {
        username: faker.internet.userName(),
        password: Hash.make("1234568"),
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
      };
    });
  }
  run() {
    try {
      const users = this.create();
      console.log(users);
      UserModel.insertMany(this.create());
    } catch (err: any) {
      debugPrint("SeederError" + err);
    }
  }
}
export default UserSeeders;
