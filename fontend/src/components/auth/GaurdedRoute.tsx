import { RouteProps, Route, Redirect } from "react-router-dom";
import { Auth } from "../../utils/auth";

export interface IGuardRoute extends RouteProps {
  redirectTo?: string;
}

export const GuardedRoute: React.FC<IGuardRoute> = ({
  redirectTo,

  ...rest
}) => {
  let isAuthenticated = Auth.check();

  // let redirectPath = "";

  // if (!isAuthenticated) {
  //   redirectPath = authenticationPath;
  // }

  // if (isAuthenticated && !isAllowed) {
  //   redirectPath = restrictedPath;
  // }
  console.log(!redirectTo && isAuthenticated);

  return isAuthenticated ? (
    <Route {...rest} render={undefined} />
  ) : (
    <Redirect to={{ pathname: redirectTo }} exact={true} />
  );
};
