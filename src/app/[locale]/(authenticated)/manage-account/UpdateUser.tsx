"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classix";
import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "../../../../context/currentUser/hook";
import { useUpdateUserMutation } from "../../../../hooks/mutations/users/update";
import { useRouter } from "../../../../navigation";
import { getBase64 } from "../../../../utils/base64";
import { useClientTranslations } from "../../../../utils/translations/client";
import { FormSchema } from "./formSchema";

export default function UpdateUser(): JSX.Element {
  const router = useRouter();
  const t = useClientTranslations("client.UpdateUser");

  const currentUser = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: currentUser.name },
  });

  const updateUser = useUpdateUserMutation({ onSuccess: router.refresh.bind(router) });

  function submit(event: FormEvent<HTMLFormElement>) {
    void handleSubmit(async function (data) {
      if (data.image !== undefined) {
        updateUser.mutate({ name: data.name, image: await getBase64(data.image) });
      } else {
        updateUser.mutate({ name: data.name });
      }
    })(event);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={submit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("imageLabel")}</span>
        </label>
        <input
          {...register("image", { required: false })}
          accept="image/*"
          className="file-input w-72"
          type="file"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("nameLabel")}</span>
        </label>
        <input
          {...register("name")}
          className={cx(
            "input input-bordered w-72",
            errors.name !== undefined && "outline outline-error",
          )}
          placeholder={t("namePlaceholder")}
        />
        <label className="label">
          <span className="label-text-alt">
            {errors.name?.type === "too_small"
              ? t("nameTooSmall", { length: 2 })
              : errors.name?.type === "too_big"
                ? t("nameTooBig", { length: 32 })
                : errors.name?.message}
          </span>
        </label>
      </div>
      <button className="btn btn-primary" disabled={updateUser.isPending} type="submit">
        {updateUser.isPending && <span className="loading loading-spinner" />}
        {t("submitButtonText")}
      </button>
    </form>
  );
}
