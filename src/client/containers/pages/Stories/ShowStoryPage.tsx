import * as React from "react";
import {Map} from 'immutable';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';
import {kernel} from 'src/client/index';
import {FullErrorDialog} from 'src/client/components/Main/FullErrorDialog';
import {StoryDetails} from 'src/client/components/Story/StoryDetails';
import {FetchStoryAction} from 'src/client/actions/stories/FetchStoryAction';

interface IProps extends React.Props<ShowStoryPage> {
  params: {id?};
  error: Error;
  currentStory: Map<any, any>;
  isFetching: boolean;
  isUpdating: boolean;
  fetchStoryAction: FetchStoryAction;
}

export class ShowStoryPage extends React.Component<IProps, any> {

  componentWillMount() {
    this.props.fetchStoryAction.run('show', this.props.params.id);
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
        <StoryDetails
          story={this.props.currentStory} />
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
  let currentStory = stories.get('instances').get('show', Map());

  let story = entities.get('stories').get(currentStory.get('result'), Map());

  return {
    currentStory: story,
    isFetching: currentStory.get('isFetching'),
    isUpdating: currentStory.get('isUpdating'),
    error: currentStory.get('error')
  }
}

function mapDispatchToProps() {
  return kernel.actionCreators;
}

export const ConnectedShowStoryPage = connect(mapStateToProps, mapDispatchToProps)(ShowStoryPage);