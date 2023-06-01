"use client";

import Link from "next/link";
import Spinner from "../../../components/Spinner";
import UserPreviewCard from "../../../components/UserPreviewCard";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSearchUsers } from "../../api/users/search/hook";

type Props = {
  query: string;
};

export default function SearchResults(props: Props): JSX.Element | null {
  const debouncedQuery = useDebounce(props.query);
  const search = useSearchUsers(debouncedQuery);

  if (search.isFetching) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (search.isSuccess) {
    return (
      <ul className="flex flex-col">
        {search.data.users.map((user) => (
          <li key={user.id}>
            <Link href={`/user/${user.id}`}>
              <UserPreviewCard user={user} />
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return null;
}
