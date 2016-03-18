import * as React from "react";
import {
  Paper,
  Divider,
  List, ListItem,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {Map, fromJS} from 'immutable';

interface IProps {
	story: Map<any, any>;
}

export class StoryDetails extends React.Component<IProps, any> {

  render() {
    return (
      <div>
      	<Paper>
      		<Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Story Details" />
            </ToolbarGroup>
      		</Toolbar>
          <div>
            <List>
              <ListItem
                primaryText="Title"
                secondaryText={this.props.story.get('title')} />
              <ListItem
                primaryText="Description"
                secondaryText={this.props.story.get('description')} />
            </List>
          </div>
      	</Paper>
      </div>
    );
  }
}