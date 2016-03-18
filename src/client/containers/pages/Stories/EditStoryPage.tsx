import * as React from "react";
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {kernel} from 'src/client/index';
import {FullErrorDialog} from 'src/client/components/Main/FullErrorDialog';
import {StoryForm} from 'src/client/components/Story/StoryForm';
import {FetchStoryAction} from 'src/client/actions/stories/FetchStoryAction';
import {CreateStoryAction} from 'src/client/actions/stories/CreateStoryAction';
import {UpdateStoryAction} from 'src/client/actions/stories/UpdateStoryAction';
import {CircularProgress} from 'material-ui';

interface IProps extends React.Props<EditStoryPage> {
  params: {id?};
  error: Error;
  editStory: Map<any, any>;
  isFetching: boolean;
  isUpdating: boolean;
  fetchStoryAction: FetchStoryAction;
  replaceStoryAction: UpdateStoryAction;
}

export class EditStoryPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.fetchStory();
  }
 
  saveStory(data) {
    this.props.replaceStoryAction.run('edit', this.props.params.id, data);
  }

  addTask() {
    this.state.tasks.push({});
  }

  fetchStory() {
    this.props.fetchStoryAction.run('edit', this.props.params.id);
  }

  /**
   * In this page dave should be able to create stories
   */
  render() {
    let result;
    if(this.props.error) {
      result = <FullErrorDialog error={this.props.error} />
    } else if(this.props.isUpdating || this.props.isFetching) {
      result = <CircularProgress />;
    } else {
      result = (
        <div>
          <StoryForm
            isFetching={this.props.isFetching} 
            isUpdating={this.props.isUpdating} 
            onSave={(data) => this.saveStory(data)} 
            story={this.props.editStory} />
        </div>
      );
    }
    return (
      <div style={{padding: "20px 0px"}}>
        {result}
      </div>
    )
  }
}

function mapStateToProps({stories, entities}) {
  let editStory = stories.get('instances').get('edit', Map());

  let story = entities.get('stories').get(editStory.get('result'), Map());

  return {
    editStory: story,
    isFetching: editStory.get('isFetching'),
    isUpdating: editStory.get('isUpdating'),
    error: editStory.get('error')
  }
}

function mapDispatchToProps() {
  return kernel.actionCreators;
}

export const ConnectedEditStoryPage = connect(mapStateToProps, mapDispatchToProps)(EditStoryPage);