import React, { useEffect, useState } from "react";
import { Route, useHistory, withRouter } from "react-router-dom";
// Router interface
import { IRoutes } from "../../interfaces/IRoutes";
// Layout components
import AdminLayouts from "../../layouts/AdminLayouts";
import AppLayouts from "../../layouts/AppLayouts";

import { GuardedRoute } from "./GaurdedRoute";
// redirect authRedirect path
import { authRedirect } from "../../routes";
import { Col, Progress, Row } from "antd";
import Icon, { PlayCircleOutlined } from "@ant-design/icons";
import { Loader } from "../loader";

export const LayoutBaseRender: React.FC<IRoutes> = ({
  rootLayout,
  exact,
  path,
  component,
  authenticate,
  redirect,
}) => {
  let data = <></>;

  // console.log("rootLayout", rootLayout === undefined);
  // console.log("component", component);

  if (rootLayout === "AppLayouts") {
    data = (
      <AppLayouts
        children={
          authenticate ? (
            <Route exact={exact} path={path} component={component} />
          ) : (
            <GuardedRoute
              path={path}
              redirectTo={redirect}
              component={component}
              exact={true}
            />
          )
        }
      />
    );
  } else if (rootLayout === "AdminLayouts") {
    data = (
      <AdminLayouts
        children={
          !authenticate ? (
            <Route exact={exact} path={path} component={component} />
          ) : (
            <GuardedRoute
              path={path}
              redirectTo={redirect}
              component={component}
              exact={true}
            />
          )
        }
      />
    );
  } else if (rootLayout === undefined) {
    data = <Route exact={exact} path={path} component={component} />;
  }

  return data;
};
export default LayoutBaseRender;
