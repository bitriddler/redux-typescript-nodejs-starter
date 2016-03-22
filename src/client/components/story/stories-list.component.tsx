import * as React from "react";
import {
  Paper,
  Divider,
  RaisedButton, FloatingActionButton,
  Table, TableHeader, TableRow, TableHeaderColumn, TableRowColumn, TableBody,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {IStory} from 'shared/models';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

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
            primary={true}/>
          <RaisedButton
            label="Delete"
            onTouchTap={() => this.props.deleteStory(story)}
            secondary={true}/>
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
      <div className="stories-list-component">
      	<Paper>
      		<Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Stories List" />
            </ToolbarGroup>
          </Toolbar>
          <div>
            {this.getTable()}
          </div>
      	</Paper>
        <FloatingActionButton
          className="button-floating"
          mini={false}
          onTouchTap={() => this.props.createStory()}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}