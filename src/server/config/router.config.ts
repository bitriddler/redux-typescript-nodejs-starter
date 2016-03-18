import {Router} from 'express';
import {configureStoryRouter} from 'src/server/routers/storyRouter';

export function configureRouter(controllers) {
	let apiRouter = Router();

	apiRouter.use('/api/v1/story', configureStoryRouter(controllers.storyController));

	return apiRouter;
}