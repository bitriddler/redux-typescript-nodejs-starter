import * as React from "react";
import {Paper} from 'material-ui';
import {connect} from 'react-redux';

interface IProps {
}

export class DashboardPage extends React.Component<IProps, any> {
  render() {
    return (
      <Paper style={{'marginTop': 20, 'padding': '20'}} zDepth={3}>
      	<h1>Hello world</h1>
      </Paper>
    );
  }
}

export const ConnectedDashboardPage = connect()(DashboardPage);