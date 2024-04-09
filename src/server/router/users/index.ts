import "server-only";
import { createRouter } from "../..";
import { deleteCurrent } from "./delete-current";
import { get } from "./get";
import { getCurrent } from "./get-current";
import { update } from "./update";

export const users = createRouter({
	// queries
	get,
	getCurrent,
	// mutations
	deleteCurrent,
	update,
});
