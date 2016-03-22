import {BaseApi} from 'client/api/base/base-api';
import {Schema, arrayOf} from 'normalizr';
import {IStory} from 'shared/models';
import {IStoryApi} from 'shared/api';

export class StoryApi extends BaseApi implements IStoryApi {

  getSchema() {
    return new Schema('stories', {
      idAttribute: '_id'
    });
  }

  all() {
    return this.get<IStory>('story');
  }

  findById(id) {
    return this.get<IStory[]>(`story/${id}`);
  }

  replace(id, attributes) {
    return this.put<IStory>(`story/${id}`, attributes);
  }

  update(id, attributes) {
    return this.patch<IStory>(`story/${id}`, attributes);
  }

  create(attributes) {
    return this.post<IStory>(`story`, attributes);
  }

  remove(id) {
    return this.delete(`story/${id}`);
  }
}
