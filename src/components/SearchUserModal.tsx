"use client";

import Link from "next-intl/link";
import type { ChangeEvent } from "react";
import { forwardRef, useRef, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import { mergeRefs } from "../utils/refs";
import { useClientTranslations } from "../utils/translations/client";
import { trpc } from "../utils/trpc/client";
import Modal from "./Modal";
import UserPreviewCard from "./UserPreviewCard";

export default forwardRef<HTMLDialogElement>(function SearchModal(_props, ref) {
  const t = useClientTranslations("client.SearchUserModal");

  const innerRef = useRef<HTMLDialogElement>(null);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  const search = trpc.users.search.useQuery(
    { query: debouncedQuery },
    { enabled: debouncedQuery.length >= 4 },
  );

  function close() {
    innerRef.current?.close();
    setTimeout(function () {
      setQuery("");
    }, 200);
  }

  return (
    <Modal
      className="flex flex-col items-center gap-4 pb-20"
      close={close}
      ref={mergeRefs(ref, innerRef)}
    >
      <input
        autoFocus
        className="input input-bordered w-full max-w-xs"
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
          <ul className="flex w-[calc(min(400px,100vw)-48px)] flex-col">
            {search.data.length > 0 ? (
              search.data.map((user) => (
                <li className="" key={user.id}>
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
    </Modal>
  );
});
