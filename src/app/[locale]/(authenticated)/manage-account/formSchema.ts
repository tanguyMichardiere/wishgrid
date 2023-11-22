import "client-only";
import { z } from "zod";
import { UserName } from "../../../../server/database/types/user";

export const FormSchema = z.object({
  name: UserName,
  image: z.instanceof(FileList).transform(([file]) => file),
});
export type FormSchema = z.infer<typeof FormSchema>;
