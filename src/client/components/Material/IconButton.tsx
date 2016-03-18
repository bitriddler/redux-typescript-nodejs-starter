import * as React from "react";
import {IconButton as MaterialIconButton} from "material-ui";

export class IconButton extends React.Component<any, any> {
  render() {
    return (
      <MaterialIconButton iconClassName="material-icons">{this.props.iconName}</MaterialIconButton>
    );
  }
}