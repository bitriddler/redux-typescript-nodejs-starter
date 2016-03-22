import * as React from "react";
import {Paper} from 'material-ui';
import {IApiError} from 'client/api/base/base.api';

interface IProps {
  error: IApiError;
}

export class ApiError extends React.Component<IProps, any> {
  render() {
  	let {statusCode, error} = this.props.error;

    return (
      <div className="api-error-dialog-component">
        <Paper>
          <h1>Full error component</h1>
          <b>Status code: </b>{statusCode}<br/>
          <b>Type: </b>{error.type}<br/>
          <b>Description: </b>{error.description}<br/>
          <b>Message: </b>{error.message}<br/>
        </Paper>
      </div>
    );
  }
}