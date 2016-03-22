import {Schema, Model, Mongoose} from 'mongoose';
import {timestampsPlugin} from 'server/plugins/timestamps-plugin';
import {promisifyPlugin} from 'server/plugins/promisify-plugin';
import {IStory} from 'shared/models';
import {BaseDocument} from 'server/models/base.d';

export interface IStoryDocument extends IStory, BaseDocument<IStoryDocument> {
  replaceAttributes(attrs: IStory): void;
  updateAttributes(attrs: IStory): void;
}

export var StoryModel: Model<IStoryDocument>;

export function configureStoryModel(mongoose: Mongoose) {
  var storySchema = new Schema({
    title: String,
    description: String
  });

  storySchema.method('replaceAttributes', function(attributes) {
    this.title = attributes.title;
    this.description = attributes.description;
  });

  storySchema.method('updateAttributes', function(attributes) {
    if(attributes.title) {
      this.title = attributes.title;
    }

    if(attributes.description) {
      this.description = attributes.description;
    }
  });

  storySchema.plugin(timestampsPlugin);
  storySchema.plugin(promisifyPlugin);

  StoryModel = mongoose.model<IStoryDocument>('Story', storySchema); 
}