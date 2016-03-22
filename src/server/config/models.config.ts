import {Mongoose} from 'mongoose';
import {configureStoryModel} from 'server/models/story/StoryModel';

export function configureModels(mongoose: Mongoose) {
  configureStoryModel(mongoose);
}