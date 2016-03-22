import * as React from "react";
import {
  Paper,
  Divider,
  CircularProgress,
  List, ListItem,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {IStory} from 'shared/models';

interface IProps {
	story: IStory;
}

export class StoryDetails extends React.Component<IProps, any> {

  private renderStory() {
    return (
      <div className="story-details-component">
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
                secondaryText={this.props.story.title} />
              <ListItem
                primaryText="Description"
                secondaryText={this.props.story.description} />
            </List>
          </div>
        </Paper>
      </div>
    );
  }

  render() {
    if(this.props.story) {
      return this.renderStory();
    } else {
      return <CircularProgress />
    }
  }
}