import UserModel from "../models/user/user.model";
import RepositoryInterface from "../utils/interfaces/repository.interface";

class UserRepository implements RepositoryInterface {
  // Find All Users
  async FindAllUsers(): Promise<Array<object>> {
    return await UserModel.find({});
  }
  // Find User By Id
  async FindById(_id: number): Promise<any> {
    return await UserModel.findOne({
      _id,
    });
  }
  // Find User By Id
  async FindUserByEmail(email: string): Promise<any> {
    return await UserModel.findOne({
      email,
    });
  }
  // Find User By Id
  async CreateUser(forms: object) {
    return await UserModel.create(forms);
  }
}

export default UserRepository;
