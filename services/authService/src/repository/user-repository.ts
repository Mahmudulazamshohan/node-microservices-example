import UserModel from "../models/user/user.model";
import RepositoryInterface from "../utils/interfaces/repository.interface";

class UserRepository implements RepositoryInterface {
  async FindAllUsers(): Promise<Array<object>> {
    return await UserModel.find({});
  }

  async FindById(_id: number): Promise<any> {
    return await UserModel.findOne({
      _id,
    });
  }

  async FindUserByEmail(email: string): Promise<any> {
    return await UserModel.findOne({
      email,
    });
  }

  async CreateUser(forms: object) {
    return await UserModel.create(forms);
  }
}
export default UserRepository;
