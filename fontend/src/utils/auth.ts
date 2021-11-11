import axios from "axios";
import UniversalCookie from "universal-cookie";
const cookies = new UniversalCookie();

export class Auth {
  /**
   *
   *
   **/
  static login(token: string): void {
    return cookies.set("token", "");
  }
  static async user() {
    const res: any = await axios.get("/users");
    console.log(res);
    if (res.status) {
      return res.data;
    }
    return null;
  }
  static check() {
    return !!Auth.user();
  }
}
