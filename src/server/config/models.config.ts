import {Mongoose} from 'mongoose';
import {configureStoryModel} from 'src/server/models/story/StoryModel';

export function configureModels(mongoose: Mongoose) {
  configureStoryModel(mongoose);
}