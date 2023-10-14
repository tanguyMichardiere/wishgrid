/* eslint-disable @typescript-eslint/consistent-type-imports */

type En = typeof import("../../messages/en.json");
type Fr = typeof import("../../messages/fr.json");

function assertEn(messages: En) {
  assertFr(messages);
}

function assertFr(messages: Fr) {
  assertEn(messages);
}
