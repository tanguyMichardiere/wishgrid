"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SearchResults from "./SearchResults";

const FormData = z.object({ name: z.string().min(4).max(32) });
type FormData = z.infer<typeof FormData>;

export default function SearchPage(): JSX.Element {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormData),
    defaultValues: { name: "" },
  });
  const name = watch("name");

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4">
      <form className="text-center">
        <input
          autoFocus
          className="input w-full max-w-xs"
          placeholder="Search by name"
          {...register("name")}
        />
        {errors["name"] !== undefined && <p>{errors["name"].message?.toString()}</p>}
      </form>
      <SearchResults query={name} />
    </div>
  );
}
