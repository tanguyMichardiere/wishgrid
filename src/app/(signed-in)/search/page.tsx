"use client";

import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import SearchResults from "./SearchResults";

export default function SearchPage(): JSX.Element {
  const [query, setQuery] = useState("");
  const handleChange = useCallback(function (event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <input
        autoFocus
        className="input mx-auto w-full max-w-xs"
        onChange={handleChange}
        placeholder="Search by name, email, etc."
        value={query}
      />
      <SearchResults query={query} />
    </div>
  );
}
