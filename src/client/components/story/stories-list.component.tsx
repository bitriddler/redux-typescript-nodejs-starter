import * as React from "react";
import {
  Paper,
  Divider,
  RaisedButton,
  Table, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, TableBody,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {IStory} from 'src/shared/models';

interface IProps {
	stories: IStory[];
  createStory: Function;
  showStory: Function;
  editStory: Function;
  deleteStory: Function;
}

export class StoriesList extends React.Component<IProps, any> {

  getTableRows() {
    return this.props.stories.map((story) => (
      <TableRow key={story._id}>
        <TableRowColumn>{story.title}</TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            label="Show"
            onTouchTap={() => this.props.showStory(story)}/>
          <RaisedButton
            label="Edit"
            onTouchTap={() => this.props.editStory(story)}
            secondary={true}/>
          <RaisedButton
            label="Delete"
            onTouchTap={() => this.props.deleteStory(story)}
            primary={true}/>
        </TableRowColumn>
      </TableRow>
    ))
  }

  getTable() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Tools</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.getTableRows()}
        </TableBody>
      </Table>
    );
  }

  render() {
    return (
      <div>
      	<Paper>
      		<Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Stories List" />
            </ToolbarGroup>
            <ToolbarGroup float="right">
              <RaisedButton
                label="Create new story"
                onTouchTap={() => this.props.createStory()}/>
            </ToolbarGroup>
          </Toolbar>
          <div>
            {this.getTable()}
          </div>
      	</Paper>
      </div>
    );
  }
}