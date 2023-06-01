import Link from "next/link";
import UserPreviewCard from "../../components/UserPreviewCard";
import { getFriends } from "../../server/friends";

export const runtime = "edge";

export default async function HomePage(): Promise<JSX.Element> {
  const friends = await getFriends();

  return (
    <ul className="flex flex-col">
      {friends.map((user) => (
        <li key={user.id}>
          <Link href={`/friend/${user.id}`}>
            <UserPreviewCard user={user} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
