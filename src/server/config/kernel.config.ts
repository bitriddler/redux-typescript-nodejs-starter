import {StoryController} from 'server/controllers/StoryController';
import {StoryRepository} from 'server/models/story/StoryRepository';

export function configureKernel() {

  const storyRepository = new StoryRepository();

  // Bind controllers
  const storyController = new StoryController(storyRepository);

  return {
    // Bind controllers used in our app
    controllers: {
      storyController
    }
  };
}
