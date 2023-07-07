export class ServerError extends Error {}

export class UserError extends ServerError {}

export class UserNotFriendError extends UserError {}
