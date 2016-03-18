import * as React from "react";
import {
  Paper,
  Divider,
  RaisedButton,
  Table, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, TableBody,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import * as Immutable from 'immutable';

interface IProps {
	stories: Immutable.List<Immutable.Map<string, any>>;
  createStory: Function;
  showStory: Function;
  editStory: Function;
  deleteStory: Function;
}

export class StoriesList extends React.Component<IProps, any> {

  getTableRows() {
    return this.props.stories.map((story) => (
      <TableRow key={story.get('_id')}>
        <TableRowColumn>{story.get('title')}</TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            label="Show"
            onClick={() => this.props.showStory(story)}
            default={true}/>
          <RaisedButton
            label="Edit"
            onClick={() => this.props.editStory(story)}
            secondary={true}/>
          <RaisedButton
            label="Delete"
            onClick={() => this.props.deleteStory(story)}
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
                onClick={() => this.props.createStory()}
                default={true}/>
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