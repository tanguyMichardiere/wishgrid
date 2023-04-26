import type { GetStaticPropsResult } from "next";
import { NODE_ENV } from "../env";

type Props = {
  session: null;
  panel: string;
};

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  if (NODE_ENV === "development") {
    const { renderTrpcPanel } = await import("trpc-panel");
    const { router } = await import("../server/router");
    const panel = renderTrpcPanel(router, { url: "/api/trpc", transformer: "superjson" });
    return { props: { session: null, panel } };
  }
  return { notFound: true };
}

export default function PanelPage(props: Props): JSX.Element {
  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: props.panel,
      }}
    />
  );
}
