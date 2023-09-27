/* eslint-disable @typescript-eslint/consistent-type-imports */

function assertEn(messages: typeof import("../../messages/en.json")) {
  assertFr(messages);
}

function assertFr(messages: typeof import("../../messages/fr.json")) {
  assertEn(messages);
}
