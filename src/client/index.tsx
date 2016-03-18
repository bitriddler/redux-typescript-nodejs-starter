import * as React from "react";
import * as ReactDOM from "react-dom";
import {Root} from "src/client/containers/Root";
import {registerActionCreators} from "src/client/actions/register";
import {configureRoutes} from "src/client/config/routes.config";
import {configureStore} from "src/client/config/store.config";
import {configureKernel} from "src/client/config/kernel.config";
import {configureMaterialUi} from "src/client/config/material.config";

configureMaterialUi();

const {store, history} = configureStore();
const routes = configureRoutes(history);
export const kernel = configureKernel(store);

registerActionCreators();

ReactDOM.render(
  <Root store={store} routes={routes} />,
  document.getElementById("root")
)
