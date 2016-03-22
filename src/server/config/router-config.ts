import {Router} from 'express';
import {configureStoryRouter} from 'server/routers/story-router';

export function configureRouter(controllers) {
	let apiRouter = Router();

	apiRouter.use('/api/v1/story', configureStoryRouter(controllers.storyController));

	return apiRouter;
}