import {Promise} from 'mongoose';
import {StoryModel, IStoryDocument} from 'src/server/models/story/StoryModel';

export class StoryRepository {

  all() {
    return StoryModel.find({}).exec();
  }

  findById(id) {
    return StoryModel.findById(id).exec();
  }

  create(attributes) {
    var story = new StoryModel();
    story.replaceAttributes(attributes);
    return story.promiseToSave();
  }

  update(story: IStoryDocument, attributes) {
    story.updateAttributes(attributes);
    return story.promiseToSave();
  }

  replace(story: IStoryDocument, attributes) {
    story.replaceAttributes(attributes);
    return story.promiseToSave();
  }

  remove(story: IStoryDocument) {
    return StoryModel.remove({_id: story.id}).exec();
  }
}
