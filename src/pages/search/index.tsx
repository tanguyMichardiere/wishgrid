import { zodResolver } from "@hookform/resolvers/zod";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { Session } from "next-auth";
import { log } from "next-axiom";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import UserPreviewCard from "../../components/UserPreviewCard";
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

export default function SearchPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormData),
  });
  const [name, setName] = useState("");
  const onSubmit = useCallback(function (data: FormData) {
    setName(data.name);
  }, []);

  const search = trpc.user.search.useQuery({ name }, { enabled: name.length > 0 });
  log.debug("search", { search });
  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_TITLE} - Search`}</title>
      </Head>
      <Navbar title="Search" />
      <div className="mx-auto flex max-w-sm flex-col gap-4">
        <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
          <input autoFocus className="input w-full max-w-xs" {...register("name")} />
          {errors["name"] !== undefined && <p>{errors["name"].message?.toString()}</p>}
        </form>
        {search.isSuccess ? (
          <ul className="flex flex-col">
            {search.data.map((user) => (
              <li key={user.id}>
                <Link href={`/user/${user.id}`}>
                  <UserPreviewCard user={user} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          search.isFetching && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )
        )}
      </div>
    </>
  );
}
