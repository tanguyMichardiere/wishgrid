import { zodResolver } from "@hookform/resolvers/zod";
import { cx } from "classix";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import Head from "next/head";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "../../../components/Navbar";
import { NEXT_PUBLIC_TITLE } from "../../../env";
import { getServerSession } from "../../../utils/serverSideHelpers";
import { trpc } from "../../../utils/trpc";

type Props = {
  session: Session;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const session = await getServerSession(context);
  if (session === null) {
    return { redirect: { destination: "/unauthenticated", permanent: false } };
  }

  return { props: { session } };
}

const FormData = z.object({
  title: z.string().min(4).max(32),
  description: z.string().max(256),
  link: z.union([z.literal(""), z.string().url()]),
});
type FormData = z.infer<typeof FormData>;

export default function CreateWishPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormData),
  });

  const createWish = trpc.wish.create.useMutation({
    onSuccess() {
      reset();
    },
  });

  const onSubmit = useCallback(
    function (data: FormData) {
      createWish.mutate(data);
    },
    [createWish]
  );

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - New Wish`}</title>
      </Head>
      <Navbar backHref="/wish-list" title="New Wish" />
      <div className="mx-auto max-w-sm">
        <form
          className="flex flex-col items-center gap-2 text-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            autoFocus
            className="input-bordered input w-56"
            maxLength={32}
            minLength={4}
            placeholder="Title"
            required
            {...register("title")}
          />
          <textarea
            className="textarea-bordered textarea w-72 resize-y"
            maxLength={256}
            placeholder="Description"
            required
            rows={5}
            {...register("description")}
          />
          <input className="input-bordered input w-72" placeholder="URL" {...register("link")} />
          {errors.link !== undefined && <p>{errors.link.message?.toString()}</p>}
          <button
            className={cx("btn", createWish.isLoading && "loading")}
            disabled={createWish.isLoading}
            type="submit"
          >
            Submit
          </button>
          {createWish.isSuccess && <p>Wish created successfully</p>}
        </form>
      </div>
    </>
  );
}
