import { Router, Response, Request } from "express";
import fs from "fs";
import path from "path";
import JsonWebToken from "jsonwebtoken";

import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/login", async (req: Request, res: Response) => {
  const { email, password } = req.query;
  let key = await fs.readFileSync(
    path.join(__dirname, "../../private.pem")
  );
  let fields = {
    email,
    password,
  };
  let options: object = {
    algorithm: "RS256",
    expiresIn: "1m",
  };

  if (email && password) {
    var token = JsonWebToken.sign(fields, key, options);

    res.json({
      status: 200,
      data: {
        token,
      },
    });
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
});
router.get(
  "/verify",
  AuthMiddleware,
  (req: Request, res: Response) => {
    var { token } = req.query;

    var data = JsonWebToken.verify(
      String(token).toString(),
      "somesecret"
    );
    res.json({
      data,
    });
  }
);
export const AuthRouter = router;
