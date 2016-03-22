import * as React from "react";
import {Provider} from "react-redux";
import {DevTools} from 'client/components/dev/dev-tools.component';
import {isDevEnv} from "shared/helpers";

interface IProps {
  store: any;
  routes: any;
}

export default class Root extends React.Component<IProps, any> {

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
