import * as React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import AppContainer from 'src/client/containers/app.container';
import DashboardPage from 'src/client/pages/dashboard.page';
import CreateStoryPage from 'src/client/pages/story/create-story.page';
import EditStoryPage from 'src/client/pages/story/edit-story.page';
import StoryDetaills from 'src/client/pages/story/story-details.page';
import ListStoriesPage from 'src/client/pages/story/list-stories.page';

export function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute
          component={DashboardPage} />
        <Route path="/stories/create"
          component={CreateStoryPage} />
        <Route path="/stories/update/:id"
          component={EditStoryPage} />
        <Route path="/stories/show/:id"
          component={StoryDetaills} />
        <Route path="/stories"
          component={ListStoriesPage} />
      </Route>
    </Router>
  );
}
