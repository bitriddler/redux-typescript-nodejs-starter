import * as React from "react";
import {Provider} from "react-redux";
import {DevTools} from "src/client/containers/DevTools";
import { isDevEnv } from "src/client/utils/helpers";
import {App} from "src/client/containers/App";

interface IProps {
  store: any;
  routes: any;
}

export class Root extends React.Component<IProps, any> {

	render() {
		const { store, routes } = this.props;
		return (
      <Provider store={store}>
        <div>
          {routes}
          {isDevEnv() && <DevTools />}
        </div>
      </Provider>
		)
	}
}
