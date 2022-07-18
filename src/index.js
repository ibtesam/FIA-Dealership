import React from "react";
import ReactDOM from "react-dom";
import "react-hot-loader/patch";
import NextApp from "./NextApp";
import registerServiceWorker from "./registerServiceWorker";
// Add this import:
import {AppContainer} from "react-hot-loader";

// Wrap the rendering in a function:
const render = Component => {
  ReactDOM.render(
    // Wrap App inside AppContainer
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

// Do this once
registerServiceWorker();

// Render once
window.addEventListener("DOMContentLoaded", event => {
  render(NextApp);
});

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./NextApp", () => {
    render(NextApp);
  });
}
