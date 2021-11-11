import { IRoutes } from "../interfaces/IRoutes";
import HomePage from "../pages/HomePage";
import BoardPage from "../pages/BoardPage";
import NotfoundPage from "../pages/NotfoundPage";
import AppLayouts from "../layouts/AppLayouts";
import LoginPage from "../pages/auth/LoginPage";

export const authRedirect: string = "/login";

const routes: Array<IRoutes> = [
  {
    path: "/",
    title: "Home",
    rootLayout: "AppLayouts",
    exact: true,
    authenticate: false,
    middleware: "user",
    component: HomePage,
    redirect: "/login",
  },
  {
    path: "/admin",
    title: "Home",
    rootLayout: "AdminLayouts",
    exact: true,
    authenticate: true,
    middleware: "user",
    component: () => {
      return <p>yes,damn</p>;
    },
  },
  {
    path: "/login",
    title: "Login",
    exact: true,
    authenticate: true,
    middleware: "none",
    component: LoginPage,
  },
  {
    path: "/board/:id",
    title: "Board Page",
    rootLayout: "AppLayouts",
    exact: true,
    authenticate: true,
    middleware: "user",
    component: BoardPage,
  },

  {
    path: "*",
    title: "404 | Page not found",
    exact: true,
    authenticate: false,
    component: NotfoundPage,
    middleware: "none",
  },
];
export default routes;
