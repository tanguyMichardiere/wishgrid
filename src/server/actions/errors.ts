import { ServerError } from "../errors";

export class ActionError extends ServerError {}

export class FriendRequestError extends ActionError {}

export class FriendRequestNotFoundError extends FriendRequestError {}
