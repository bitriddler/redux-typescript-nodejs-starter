import * as React from "react";
import { connect } from "react-redux";
import {kernel} from "src/client/index";
import {AppBar, LeftNav, MenuItem, IconButton, Icons} from 'material-ui';
import {PushRouteAction} from 'src/client/actions/routes/PushRouteAction';

interface IProps extends React.Props<App> {
	pushRouteAction: PushRouteAction;
}

interface IState {
	openLeftNav: boolean;
}

export class App extends React.Component<IProps, IState> {

	componentWillMount() {
		this.setInitialState();
	}

	setInitialState() {
		this.setState({
			openLeftNav: false
		});
	}

	toggleLeftNav() {
		this.setState({openLeftNav: !this.state.openLeftNav});
	}

	gotoStories() {
		this.props.pushRouteAction.run(`/stories`);
	}

	render() {
		const {children} = this.props;

		return (
			<div>
			  <AppBar
			    title="Starter Project (Typescript, Redux, React, Nodejs)"
			    onLeftIconButtonTouchTap={this.toggleLeftNav.bind(this)} />
        <LeftNav 
        		open={this.state.openLeftNav} 
        		docked={false}
				    onRequestChange={(openLeftNav) => this.setState({ openLeftNav })}>
				  <AppBar
				    title="Menu"
				    iconElementLeft={<IconButton onClick={this.toggleLeftNav.bind(this)}><Icons.NavigationChevronLeft /></IconButton>} />
          <MenuItem onTouchTap={() => this.gotoStories()}>Stories</MenuItem>
        </LeftNav>
				{children}
			</div>
		);
	}
}

function mapDispatchToProps() {
  const {
    pushRouteAction
  } = kernel.actionCreators;

  return {
    pushRouteAction,
  }
}

export var ConnectedApp = connect(null, mapDispatchToProps)(App);