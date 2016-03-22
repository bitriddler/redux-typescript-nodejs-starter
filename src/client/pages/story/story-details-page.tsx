import * as React from "react";
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'client/app/index';
import {ApiErrorComponent} from 'client/components/errors/api-error-component';
import {StoryDetailsComponent} from 'client/components/story/story-details-component';
import {StoryActions} from 'client/actions/story/story-actions';
import {RouteActions} from 'react-router-redux';
import {IApiErrorComponent} from 'client/api/base/base-api';
import {IState} from 'client/reducers/state';
import {IStory} from 'shared/models';

interface IProps extends React.Props<StoryDetailsComponentPage> {
  params: {id?};
  error: IApiErrorComponent;
  story: IStory;
  isFetching: boolean;
  isUpdating: boolean;
  storyActions: StoryActions;
}

export class StoryDetailsComponentPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.storyActions.findById('detailsPage', this.props.params.id);
  }

  /**
   * In this page dave should be able to create stories
   */
  render() {
    let result;
    if(this.props.error) {
      result = <ApiErrorComponent error={this.props.error} />
    } else if(this.props.isUpdating || this.props.isFetching) {
      result = <CircularProgress />;
    } else {
      result = (
        <StoryDetailsComponent
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

export default connect(mapStateToProps, mapDispatchToProps)(StoryDetailsComponentPage);