import axios from "axios";
const BASE_URL = "http://localhost:6001";

describe("Sign API TestCase", () => {
  test("/GET /signup Status Code test", async () => {
    try {
      const response: any = await axios.get(`${BASE_URL}/signup`);

      expect(typeof response).toEqual("object");

      const property = [
        "_id",
        "username",
        "password",
        "email",
        "firstname",
        "lastname",
        "createdAt",
        "updatedAt",
        "__v",
      ];
      const user = Object.keys(response.data.users[0]);

      expect(property).toEqual(user);
    } catch (err) {
      throw err;
    }
  });
  test("/GET /signup Property test", async () => {
    try {
      const response: any = await axios.get(`${BASE_URL}/signup`);

      expect(typeof response).toEqual("object");

      const property = [
        "_id",
        "username",
        "password",
        "email",
        "firstname",
        "lastname",
        "createdAt",
        "updatedAt",
        "__v",
      ];
      const user = Object.keys(response.data.users[0]);
      expect(property).toEqual(user);
    } catch (err) {
      throw err;
    }
  });
  test("/POST Request to Signup", () => {
    axios
      .get(`${BASE_URL}/signup`)
      .then((response: any) => {
        // Assert checking
        expect(response.status).toEqual(200);
        expect(typeof response).toEqual("object");

        const property = [
          "_id",
          "username",
          "password",
          "email",
          "firstname",
          "lastname",
          "createdAt",
          "updatedAt",
          "__v",
        ];

        const user = Object.keys(response.data.users[0]);
        expect(property).toEqual(user);
      })
      .catch((err) => {
        throw err;
      });
  });
});
