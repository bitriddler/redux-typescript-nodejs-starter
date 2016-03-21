import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'src/client/index';
import {ApiErrorDialog} from 'src/client/components/errors/api-error-dialog.component';
import {StoryDetails} from 'src/client/components/story/story-details.component';
import {StoryActions} from 'src/client/actions/story/story.actions';
import {RouteActions} from 'react-router-redux';
import {IApiError} from 'src/client/api/base/base.api';
import {IState} from 'src/client/reducers/state';
import {IStory} from 'src/shared/models';

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
      result = <ApiErrorDialog error={this.props.error} />
    } else if(this.props.isUpdating || this.props.isFetching) {
      result = <CircularProgress />;
    } else {
      result = (
        <StoryDetails
          story={this.props.story} />
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