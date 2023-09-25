"use client";

import Link from "next-intl/link";
import type { ChangeEvent } from "react";
import { useState } from "react";
import UserPreviewCard from "../../../../components/UserPreviewCard";
import { useDebounce } from "../../../../hooks/debounce";
import { useClientTranslations } from "../../../../utils/translations/client";
import { trpc } from "../../../../utils/trpc/client";

export default function SearchPage(): JSX.Element {
  const t = useClientTranslations("clientComponents.SearchPage");

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
    <div className="flex flex-col gap-4">
      <input
        autoFocus
        className="input input-bordered mx-auto w-full max-w-xs"
        maxLength={32}
        minLength={4}
        onChange={handleChange}
        placeholder={t("inputPlaceholder")}
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
              <div className="text-center">{t("noResults")}</div>
            )}
          </ul>
        )
      )}
    </div>
  );
}
