import * as React from "react";

interface IProps {
  error: Error
}

export class FullErrorDialog extends React.Component<IProps, any> {
  render() {
    return (
      <div>
        <h1>Full error component</h1>
        <pre>{JSON.stringify(this.props.error)}</pre>
      </div>
    );
  }
}