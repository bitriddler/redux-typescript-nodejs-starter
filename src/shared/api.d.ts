export interface IApi {
	all(...args);
	findById(...args);
	create(...args);
	replace(...args);
	update(...args);
	remove(...args);
}

export interface IStoryApi extends IApi {}