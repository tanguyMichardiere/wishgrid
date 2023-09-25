"use client";

import Link from "next-intl/link";
import type { ChangeEvent } from "react";
import { useState } from "react";
import UserPreviewCard from "../../../../components/UserPreviewCard";
import { useDebounce } from "../../../../hooks/debounce";
import { trpc } from "../../../../utils/trpc/client";

type Props = {
  inputPlaceholder: string;
  noResults: string;
};

export default function Search(props: Props): JSX.Element {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  const search = trpc.users.search.useQuery(
    { query: debouncedQuery },
    { enabled: debouncedQuery.length >= 4 },
  );

  return (
    <>
      <input
        autoFocus
        className="input input-bordered mx-auto w-full max-w-xs"
        maxLength={32}
        minLength={4}
        onChange={handleChange}
        placeholder={props.inputPlaceholder}
        value={query}
      />
      {search.isFetching ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner" />
        </div>
      ) : (
        search.isSuccess && (
          <ul className="flex flex-col">
            {search.data.length > 0 ? (
              search.data.map((user) => (
                <li key={user.id}>
                  <Link href={`/user/${user.id}`}>
                    <UserPreviewCard user={user} />
                  </Link>
                </li>
              ))
            ) : (
              <div className="text-center">{props.noResults}</div>
            )}
          </ul>
        )
      )}
    </>
  );
}
