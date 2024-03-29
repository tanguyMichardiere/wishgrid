import type { JSX } from "react";
import Avatar from "../../../../../components/Avatar";
import { getFriend } from "../../../../../utils/serverQueries/friends/get";
import { getWishesList } from "../../../../../utils/serverQueries/wishes/list";
import WishList from "./WishList";
import type { Params } from "./params";

type Props = {
  params: Params;
};

export default async function FriendIdPage(props: Props): Promise<JSX.Element> {
  const friend = await getFriend(props.params.id);
  const wishes = await getWishesList(props.params.id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 self-center">
        <Avatar size="large" user={friend} />
        <h3 className="text-lg">{friend.name}</h3>
      </div>
      <ul className="flex flex-col">
        <WishList initialWishes={wishes} userId={props.params.id} />
      </ul>
    </div>
  );
}
