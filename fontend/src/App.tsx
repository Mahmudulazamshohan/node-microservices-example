import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
// css import
import "./App.css";

import routes from "./routes";
import { LayoutBaseRender } from "./components/auth";
import { Loader } from "./components/loader";

function App() {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  let element: JSX.Element = <></>;

  useEffect(() => {
    let count = 1;

    const INTERVAL = 100;
    const SPEED = 28;

    let progessInterval = setInterval(() => {
      if (count >= 100) {
        clearInterval(progessInterval);
        setLoaded(true);
      }

      setProgress(count);

      count = count + Math.floor(Math.random() * SPEED);
    }, INTERVAL);
  }, []);

  if (isLoaded) {
    element = (
      <div className="App">
        <BrowserRouter>
          <Switch>
            {routes.map((route, k) => {
              return <LayoutBaseRender key={k} {...route} />;
            })}
          </Switch>
        </BrowserRouter>
      </div>
    );
  } else {
    element = <Loader progress={progress} />;
  }

  return element;
}
export default App;
