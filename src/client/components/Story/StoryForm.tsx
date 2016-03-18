import * as React from "react";
import {
  Paper,
  Divider,
  TextField, RaisedButton,
  Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {Map, fromJS} from 'immutable';

interface IProps {
  isUpdating?: boolean;
  isFetching?: boolean;
	story?: Map<any, any>;
  onSave: Function;
}

export class StoryForm extends React.Component<IProps, any> {

  componentWillMount() {
    this.setInitialState();
  }

  setInitialState() {
    this.setState({
      data: this.props.story || Map()
    });
  }

  updateTitle(e:any) {
    this.setState({
      data: this.state.data.set('title', e.target.value)
    });
  }

  updateDescription(e:any) {
    this.setState({
      data: this.state.data.set('description', e.target.value)
    });
  }

  saveFormData() {
    this.props.onSave(this.state.data);
  }

  render() {
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
        			value={this.state.data.get('title')}
              onChange={(e) => this.updateTitle(e)}
        			floatingLabelText="Story Title" />
        		<TextField 
              style={{width:"100%"}}
              value={this.state.data.get('description')}
        			floatingLabelText="Story Description" 
              onChange={(e) => this.updateDescription(e)}
        			multiLine={true} rows={4} />
            <RaisedButton 
              disabled={this.props.isUpdating}
              label="Save Story"
              primary={true} 
              onClick={() => this.saveFormData()} />
            <RaisedButton 
              disabled={this.props.isUpdating}
              label="Reset"
              default={true}
              onClick={() => this.setInitialState()} />
          </div>
      	</Paper>
      </div>
    );
  }
}