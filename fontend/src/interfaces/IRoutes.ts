import React from "react";
import { RouteProps } from "react-router";

export interface IRoutes extends RouteProps {
  path: string;
  title: string;
  exact?: boolean;
  rootLayout?: string;
  authenticate: boolean;
  middleware: "user" | "admin" | "none";
  redirect?: string;
}
