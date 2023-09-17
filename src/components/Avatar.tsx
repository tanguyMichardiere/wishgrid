"use client";

import cx from "classix";
import Image from "next/image";
import { useClientComponentsMessages } from "../context/clientComponentsMessages/hook";
import type { User } from "../server/db/types/user";
import { trpc } from "../utils/trpc/client";

const sizes = {
  small: {
    className: "w-10",
    size: 40,
  },
  large: {
    className: "w-24",
    size: 96,
  },
};

type Props = {
  className?: string;
  size: keyof typeof sizes;
  initialUser: User;
};

export default function Avatar(props: Props): JSX.Element {
  const { Avatar: messages } = useClientComponentsMessages();

  const user = trpc.users.get.useQuery(
    { userId: props.initialUser.id },
    { initialData: props.initialUser },
  );

  return (
    <div className={cx("avatar", props.className)}>
      <div className={cx("rounded-full", sizes[props.size].className)}>
        <Image
          alt={messages.altText}
          height={sizes[props.size].size}
          priority
          src={user.data.imageUrl}
          width={sizes[props.size].size}
        />
      </div>
    </div>
  );
}
