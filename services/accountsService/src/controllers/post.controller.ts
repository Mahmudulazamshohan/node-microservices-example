import * as express from "express";
import { ControllerInterface } from "../utils/interfaces/controller.interface";

import { Router, Response, Request } from "express";
import fs from "fs";
import path from "path";

import JsonWebToken from "jsonwebtoken";
import JsonResource from "../utils/response";

class PostsController implements ControllerInterface {
  path = "/accounts";
  router = express.Router();

  private posts: any = [
    {
      author: "Marcin",
      content: "Dolor sit amet",
      title: "Lorem Ipsum",
    },
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createAPost);
  }

  getAllPosts = (
    request: express.Request,
    response: express.Response
  ) => {
    JsonResource.file(
      response,
      path.join(__dirname, "../swagger.json")
    );
  };

  createAPost = (
    request: express.Request,
    response: express.Response
  ) => {
    const body: any = request.body;

    type formats = {
      email: string;
      password: string;
    };

    return JsonResource.json<formats>(response, body);
  };
}

export default PostsController;
