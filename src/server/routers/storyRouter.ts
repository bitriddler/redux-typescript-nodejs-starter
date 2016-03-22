import {Router} from 'express';
import {StoryController} from 'server/controllers/StoryController';

export function configureStoryRouter(storyController: StoryController) {
  const storyRouter = Router();

  storyRouter.param('storyId', storyController.fetch.bind(storyController));

  // Get all stories
  storyRouter.get('', storyController.all.bind(storyController));
  // Get a story by id
  storyRouter.get('/:storyId', storyController.findById.bind(storyController));
  // Create new story
  storyRouter.post('/', storyController.create.bind(storyController));
  // Replace story attributes
  storyRouter.put('/:storyId', storyController.replace.bind(storyController));
  // Update a story attributes
  storyRouter.patch('/:storyId', storyController.update.bind(storyController));
  // Delete a story
  storyRouter.delete('/:storyId', storyController.remove.bind(storyController));

  return storyRouter;
}

