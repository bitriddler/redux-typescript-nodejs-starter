import {Mongoose} from 'mongoose';
import {configureStoryModel} from 'server/models/story/story-model';

export function configureModels(mongoose: Mongoose) {
  configureStoryModel(mongoose);
}