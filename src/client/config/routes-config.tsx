import * as React from 'react';
import { Route, Router, IndexRoute } from 'react-router';
import ConnectedAppContainer from 'client/containers/app-container';
import ConnectedDashboardPage from 'client/pages/dashboard/dashboard-page';
import ConnectedCreateStoryPage from 'client/pages/story/create-story/create-story-page';
import ConnectedEditStoryPage from 'client/pages/story/edit-story/edit-story-page';
import ConnectedStoryDetaills from 'client/pages/story/story-details/story-details-page';
import ConnectedListStoriesPage from 'client/pages/story/list-stories/list-stories-page';

export function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={ConnectedAppContainer}>
        <IndexRoute
          component={ConnectedDashboardPage} />
        <Route path="/stories/create"
          component={ConnectedCreateStoryPage} />
        <Route path="/stories/update/:id"
          component={ConnectedEditStoryPage} />
        <Route path="/stories/show/:id"
          component={ConnectedStoryDetaills} />
        <Route path="/stories"
          component={ConnectedListStoriesPage} />
      </Route>
    </Router>
  );
}
