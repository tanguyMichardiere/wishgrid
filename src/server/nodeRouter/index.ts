import "server-only";
import { createRouter } from "..";
import { imageResize } from "./imageResize";

export const nodeRouter = createRouter({ imageResize });

export type NodeRouter = typeof nodeRouter;
