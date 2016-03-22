import {StoryController} from 'server/controllers/story-controller';
import {StoryRepository} from 'server/models/story/story-repository';

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
