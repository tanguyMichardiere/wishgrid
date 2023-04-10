import { zodResolver } from "@hookform/resolvers/zod";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Avatar from "../../components/Avatar";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import { NEXT_PUBLIC_TITLE } from "../../env";
import { getServerSession } from "../../utils/serverSideHelpers";
import { trpc } from "../../utils/trpc";

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
  name: z.string().min(4),
});
type FormData = z.infer<typeof FormData>;

export default function ProfilePage(): JSX.Element {
  const session = useSession({ required: true });

  const [renaming, setRenaming] = useState(false);
  const setRenamingTrue = useCallback(function () {
    setRenaming(true);
  }, []);

  const renameUser = trpc.user.rename.useMutation({
    async onSuccess() {
      await session.update();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormData),
  });
  const onSubmit = useCallback(
    function (data: FormData) {
      reset();
      setRenaming(false);
      renameUser.mutate({ name: data.name });
    },
    [reset, renameUser]
  );

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - Profile`}</title>
      </Head>
      <Navbar title="Profile" />
      <div className="mx-auto max-w-sm">
        {session.status === "authenticated" ? (
          <div className="flex flex-col items-center gap-2">
            <Avatar size="large" user={session.data.user} />
            <h3 className="text-lg">
              {session.data.user.name ?? "You have not set a user name yet"}
            </h3>
            {renaming ? (
              <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                <input autoFocus className="input" placeholder="New name" {...register("name")} />
                {errors["name"] !== undefined && <p>{errors["name"].message?.toString()}</p>}
              </form>
            ) : (
              <button className="btn" onClick={setRenamingTrue} type="button">
                {renameUser.isLoading ? <Spinner /> : "Change name"}
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
