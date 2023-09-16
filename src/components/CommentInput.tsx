"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import cx from "classix";
import { useLogger } from "next-axiom";
import type { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CommentText } from "../server/db/types/comments";
import type { User } from "../server/db/types/user";
import { trpc } from "../utils/trpc/client";

const FormSchema = z.object({
  text: CommentText,
});

type Props = {
  initialCurrentUser: User;
  userId: string;
  wishId: string;
};

export default function CommentInput(props: Props): JSX.Element {
  const log = useLogger();

  const currentUser = trpc.users.getCurrent.useQuery(undefined, {
    initialData: props.initialCurrentUser,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) });

  const trpcContext = trpc.useContext();

  const createComment = trpc.comments.create.useMutation({
    onSuccess({ id, timestamp }, { text, wishId }) {
      trpcContext.wishes.list.setData(
        { userId: props.userId },
        (wishes) =>
          wishes?.map((wish) =>
            wish.id === wishId
              ? {
                  ...wish,
                  comments: [...wish.comments, { id, text, timestamp, user: currentUser.data }],
                }
              : wish,
          ),
      );
    },
    async onSettled() {
      await trpcContext.wishes.list.invalidate({ userId: props.userId });
    },
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    handleSubmit(function (data) {
      createComment.mutate({ ...data, wishId: props.wishId });
    })(event).catch(log.error);
    reset();
  }

  return (
    <form onSubmit={submit}>
      <input
        className={cx(
          "input input-bordered w-72",
          errors.text !== undefined && "outline outline-error",
        )}
        {...register("text")}
        placeholder="Comment"
      />
    </form>
  );
}