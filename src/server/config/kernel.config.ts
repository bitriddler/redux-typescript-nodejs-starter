import {StoryController} from 'src/server/controllers/StoryController';
import {StoryRepository} from 'src/server/models/story/StoryRepository';

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
