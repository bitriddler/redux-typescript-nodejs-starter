import * as React from "react";
import {Map, List} from 'immutable';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'src/client/index';
import {FullErrorDialog} from 'src/client/components/Main/FullErrorDialog';
import {StoriesList} from 'src/client/components/Story/StoriesList';
import {FetchStoriesAction} from 'src/client/actions/stories/FetchStoriesAction';
import {RemoveStoryAction} from 'src/client/actions/stories/RemoveStoryAction';
import {PushRouteAction} from 'src/client/actions/routes/PushRouteAction';

interface IProps extends React.Props<ListStoriesPage> {
  isFetching: boolean;
  error: Error;
  stories: List<Map<string, any>>;
  fetchStoriesAction: FetchStoriesAction;
  removeStoryAction: RemoveStoryAction;
  pushRouteAction: PushRouteAction;
}

export class ListStoriesPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.fetchStoriesAction.run();
  }

  createStory() {
    this.props.pushRouteAction.run(`/stories/create`);
  }

  showStory(story) {
    this.props.pushRouteAction.run(`/stories/show/${story.get('_id')}`);
  }

  editStory(story) {
    this.props.pushRouteAction.run(`/stories/update/${story.get('_id')}`);
  }

  deleteStory(story) {
    this.props.removeStoryAction.run('deleted', story.get('_id'));
  }

  /**
   * In this page dave should be able to create stories
   */
  render() {
    let result;
    if(this.props.error) {
      result = <FullErrorDialog error={this.props.error} />
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

function mapStateToProps({stories, entities}) {
  let storiesList = stories.get('list', Map());

  let resultStories = storiesList.get('result', [])
    .filter((id) => {
      return entities.get('stories').has(id);
    })
    .map((id) => {
      return entities.get('stories').get(id);
    });

  return {
    stories: resultStories,
    isFetching: storiesList.get('isFetching'),
    error: storiesList.get('error')
  }
}

function mapDispatchToProps() {
  return kernel.actionCreators;
}

export const ConnectedListStoriesPage = connect(mapStateToProps, mapDispatchToProps)(ListStoriesPage);