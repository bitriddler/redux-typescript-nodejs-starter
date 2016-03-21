import * as React from "react";
import {connect} from 'react-redux';
import {kernel} from 'src/client/index';
import {ApiErrorDialog} from 'src/client/components/errors/api-error-dialog.component';
import {StoryForm} from 'src/client/components/story/story-form.component';
import {StoryActions} from 'src/client/actions/story/story.actions';
import {RouteActions} from 'react-router-redux';
import {CircularProgress} from 'material-ui';
import {IApiError} from 'src/client/api/base/base.api';
import {IState} from 'src/client/reducers/state';
import {IStory} from 'src/shared/models';

interface IProps extends React.Props<EditStoryPage> {
  params: {id?};
  error: IApiError;
  story: IStory;
  isFetching: boolean;
  isUpdating: boolean;
  storyActions: StoryActions;
}

export class EditStoryPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.storyActions.findById('updatePage', this.props.params.id);
  }
 
  saveStory(data) {
    this.props.storyActions.replace('updatePage', this.props.params.id, data);
  }

  /**
   * In this page dave should be able to create stories
   */
  render() {
    let result;
    if(this.props.error) {
      result = <ApiErrorDialog error={this.props.error} />
    } else if(this.props.isUpdating || this.props.isFetching) {
      result = <CircularProgress />;
    } else {
      result = (
        <div>
          <StoryForm
            isFetching={this.props.isFetching} 
            isUpdating={this.props.isUpdating} 
            onSave={(data) => this.saveStory(data)} 
            story={this.props.story} />
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

function mapStateToProps({stories, entities}: IState) {
  let updatePageStory = stories.updatePage;
  let story = entities.stories[updatePageStory.id];

  return {
    story: story,
    isFetching: updatePageStory.isFetching,
    isUpdating: updatePageStory.isUpdating,
    error: updatePageStory.error
  }
}

function mapDispatchToProps() {
  return {
    storyActions: kernel.actions.storyActions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStoryPage);