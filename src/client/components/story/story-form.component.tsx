import * as React from "react";
import {
  Paper,
  Divider,
  CircularProgress,
  TextField, RaisedButton,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {IStory} from 'src/shared/models';

interface IProps {
  isUpdating?: boolean;
  isFetching?: boolean;
	story?: IStory;
  onSave: Function;
}

interface IState {
  title?: string;
  description?: string;
}

export class StoryForm extends React.Component<IProps, IState> {

  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    if(this.props.story) {
      this.setState({
        title: this.props.story.title,
        description: this.props.story.description,
      });
    } else {
      this.setState({});
    }
  }

  updateTitle(e:any) {
    this.setState({
      title: e.target.value      
    });
  }

  updateDescription(e:any) {
    this.setState({
      description: e.target.value      
    });
  }

  saveFormData() {
    this.props.onSave(this.state);
  }

  render() {
    if(this.props.isFetching) {
      return <CircularProgress />
    }
    return (
      <div>
      	<Paper>
      		<Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Edit story" />
            </ToolbarGroup>
      		</Toolbar>
          <div style={{padding: 20}}>
        		<TextField 
              style={{width:"100%"}}
        			value={this.state.title}
              onChange={(e) => this.updateTitle(e)}
        			floatingLabelText="Story Title" />
        		<TextField 
              style={{width:"100%"}}
              value={this.state.description}
        			floatingLabelText="Story Description" 
              onChange={(e) => this.updateDescription(e)}
        			multiLine={true} rows={4} />
            <RaisedButton 
              disabled={this.props.isUpdating}
              label="Save Story"
              primary={true} 
              onTouchTap={() => this.saveFormData()} />
            <RaisedButton 
              disabled={this.props.isUpdating}
              label="Reset"
              onTouchTap={() => this.setInitialState()} />
          </div>
      	</Paper>
      </div>
    );
  }
}