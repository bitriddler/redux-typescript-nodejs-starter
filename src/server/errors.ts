export class ModelNotFoundError extends Error {
	constructor(private id = null) {
		super();
	}

	getId() { return this.id; }
}

export class ForbiddenError extends Error {
}

export class UnauthorizedError extends Error {
}

export class ValidationError extends Error {

  constructor(private messages: Object = {}) {
    super();
  }

  getMessages() {
  	return this.message;
  }
}