import {Api} from "src/client/api/Api";
import {Schema, arrayOf} from 'normalizr';
import {IStory} from 'src/shared/models';
import {IStoryApi} from 'src/shared/api';

export class StoryApi extends Api implements IStoryApi {

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
