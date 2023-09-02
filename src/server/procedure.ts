import { publicProcedure } from ".";
import { requireAuthentication } from "./middleware/requireAuthentication";

export const procedure = publicProcedure.use(requireAuthentication);
