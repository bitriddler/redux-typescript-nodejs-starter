import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'client/app/index';
import {ApiError} from 'client/components/errors/api-error.component';
import {StoryDetails} from 'client/components/story/story-details.component';
import {StoryActions} from 'client/actions/story/story.actions';
import {RouteActions} from 'react-router-redux';
import {IApiError} from 'client/api/base/base.api';
import {IState} from 'client/reducers/state';
import {IStory} from 'shared/models';

interface IProps extends React.Props<StoryDetailsPage> {
  params: {id?};
  error: IApiError;
  story: IStory;
  isFetching: boolean;
  isUpdating: boolean;
  storyActions: StoryActions;
}

export class StoryDetailsPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.storyActions.findById('detailsPage', this.props.params.id);
  }

  /**
   * In this page dave should be able to create stories
   */
  render() {
    let result;
    if(this.props.error) {
      result = <ApiError error={this.props.error} />
    } else if(this.props.isUpdating || this.props.isFetching) {
      result = <CircularProgress />;
    } else {
      result = (
        <StoryDetails
          story={this.props.story} />
      );
    }
    return (
      <div className="story-details-page">
        {result}
      </div>
    )
  }
}

function mapStateToProps({stories, entities}: IState) {
  let detailsPageStory = stories.detailsPage;

  let story = entities.stories[detailsPageStory.id];

  return {
    story: story,
    isFetching: detailsPageStory.isFetching,
    isUpdating: detailsPageStory.isUpdating,
    error: detailsPageStory.error
  }
}

function mapDispatchToProps() {
  return {
    storyActions: kernel.actions.storyActions
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryDetailsPage);