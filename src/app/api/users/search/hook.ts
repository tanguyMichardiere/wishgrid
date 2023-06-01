import type { QueryFunctionContext, UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import "client-only";
import type { RequestQuery, ResponseBody } from "./route";

async function fetchSearchUsers({ query }: { query: RequestQuery }): Promise<ResponseBody> {
  const response = await fetch(`/api/users/search?${new URLSearchParams(query).toString()}`);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.json();
}

async function queryFn(
  context: QueryFunctionContext<["users", "search", string]>
): Promise<ResponseBody> {
  return fetchSearchUsers({ query: { query: context.queryKey[2] } });
}

export function useSearchUsers(query: string): UseQueryResult<ResponseBody> {
  return useQuery({ queryKey: ["users", "search", query], queryFn, enabled: query.length >= 4 });
}
