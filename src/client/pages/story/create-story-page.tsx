import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'client/app/index';
import {ApiErrorComponent} from 'client/components/errors/api-error-component';
import {StoryFormComponent} from 'client/components/story/story-form-component';
import {StoryActions} from 'client/actions/story/story-actions';
import {LocationActions} from 'client/actions/location/location-actions';
import {IApiErrorComponent} from 'client/api/base/base-api';
import {IState} from 'client/reducers/state';
import {IStory} from 'shared/models';

interface IProps extends React.Props<CreateStoryPage> {
  error: IApiErrorComponent;
  story: IStory;
  isUpdating: boolean;
  storyActions: StoryActions;
  locationActions: LocationActions;
}

export class CreateStoryPage extends React.Component<IProps, any> {

  componentWillReceiveProps(nextProps: IProps) {
    // Story has been created successfully
    if(nextProps.story && nextProps.story._id) {
      this.props.locationActions.push(`/stories/update/${nextProps.story._id}`);

      // Unset created instance from state so that 
      // when you create again a new story you start clean
      this.props.storyActions.reset('createPage');
    }
  }

  saveStory(data) {
    this.props.storyActions.create('createPage', data);
  }

  /**
   * In this page dave should be able to create stories
   */
  render() {
    let result;
    if(this.props.error) {
      result = <ApiErrorComponent error={this.props.error} />
    } else if(this.props.isUpdating) {
      result = <CircularProgress />;
    } else {
      result = (
        <StoryFormComponent
          onSave={(data) => this.saveStory(data)} />
      );
    }
    return (
      <div className="create-story-page">
        {result}
      </div>
    )
  }
}

function mapStateToProps({stories, entities}: IState) {
  let createPageStory = stories.createPage;

  // Get story document by id from entities
  let story = entities.stories[createPageStory.id];

  return {
    story: story,
    isUpdating: createPageStory.isUpdating,
    error: createPageStory.error
  }
}

function mapDispatchToProps() {
  return {
    storyActions: kernel.actions.storyActions,
    locationActions: kernel.actions.locationActions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStoryPage);