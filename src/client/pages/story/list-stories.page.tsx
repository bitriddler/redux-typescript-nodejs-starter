import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'src/client/index';
import {ApiErrorDialog} from 'src/client/components/errors/api-error-dialog.component';
import {StoriesList} from 'src/client/components/story/stories-list.component';
import {StoryActions} from 'src/client/actions/story/story.actions';
import {LocationActions} from 'src/client/actions/location/location.actions';
import {IApiError} from 'src/client/api/base/base.api';
import {IState} from 'src/client/reducers/state';
import {IStory} from 'src/shared/models';

interface IProps extends React.Props<ListStoriesPage> {
  isFetching: boolean;
  error: IApiError;
  stories: IStory[];
  storyActions: StoryActions;
  locationActions: LocationActions;
}

export class ListStoriesPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.storyActions.all();
  }

  createStory() {
    this.props.locationActions.push(`/stories/create`);
  }

  showStory(story: IStory) {
    this.props.locationActions.push(`/stories/show/${story._id}`);
  }

  editStory(story: IStory) {
    this.props.locationActions.push(`/stories/update/${story._id}`);
  }

  deleteStory(story: IStory) {
    this.props.storyActions.remove(story._id);
  }

  /**
   * In this page dave should be able to create stories
   */
  render() {
    let result;
    if(this.props.error) {
      result = <ApiErrorDialog error={this.props.error} />
    } else if(this.props.isFetching) {
      result = <CircularProgress />;
    } else {
      result = (
        <StoriesList
          stories={this.props.stories}
          createStory={() => this.createStory()}
          showStory={(story) => this.showStory(story)}
          editStory={(story) => this.editStory(story)}
          deleteStory={(story) => this.deleteStory(story)} />
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
  let storiesList = stories.list;

  let storiesResult = storiesList.ids
    .filter((id) => !!entities.stories[id])
    .map((id) => entities.stories[id]);

  return {
    stories: storiesResult,
    isFetching: storiesList.isFetching,
    error: storiesList.error
  }
}

function mapDispatchToProps() {
  return {
    storyActions: kernel.actions.storyActions,
    locationActions: kernel.actions.locationActions
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStoriesPage);