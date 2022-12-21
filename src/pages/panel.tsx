import type { GetStaticPropsResult, InferGetServerSidePropsType } from "next";

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ session: null; panel: string }>
> {
  if (process.env.NODE_ENV === "development") {
    const { renderTrpcPanel } = await import("trpc-panel");
    const { router } = await import("../server/router");
    const panel = renderTrpcPanel(router, { url: "/api/trpc", transformer: "superjson" });
    return { props: { session: null, panel } };
  }
  return { notFound: true };
}

export default function PanelPage(
  props: InferGetServerSidePropsType<typeof getStaticProps>
): JSX.Element {
  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: props.panel,
      }}
    />
  );
}
