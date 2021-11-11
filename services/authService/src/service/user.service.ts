import UserRepository from "../repository/user-repository";
import { ApiError } from "../utils/exceptions";
import HttpStatusCode from "../utils/httpstatuscode";

class UserService {
  protected repository;

  constructor() {
    this.repository = new UserRepository();
  }

  public SignUp(forms: any): Promise<object> {
    try {
      return this.repository.CreateUser(forms);
    } catch (err: any) {
      throw new ApiError(
        "API Error " + err.message,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }
  public SignIn(forms: any): Promise<object> {
    try {
      return this.repository.CreateUser(forms);
    } catch (err: any) {
      throw new ApiError(
        "API Error " + err.message,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }

  public Users(): Promise<object> {
    try {
      return this.repository.FindAllUsers();
    } catch (err: any) {
      throw new ApiError(
        "API Error " + err.message,
        HttpStatusCode.BAD_REQUEST
      );
    }
  }
}
export default UserService;
