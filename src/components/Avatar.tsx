"use client";

import { cx } from "classix";
import Image from "next/image";
import type { User } from "../schemas/user";
import { trpc } from "../utils/trpc/client";

type Size = "small" | "large";

type Props = {
  userId: string;
  initialUser: User;
  size: Size;
};

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

export default function Avatar(props: Props): JSX.Element {
  const user = trpc.users.get.useQuery(
    { userId: props.userId },
    { initialData: props.initialUser },
  );

  return (
    <div className="avatar">
      <div className={cx("rounded-full", sizes[props.size].className)}>
        <Image
          alt="profile picture"
          height={sizes[props.size].size}
          priority
          src={user.data.imageUrl}
          width={sizes[props.size].size}
        />
      </div>
    </div>
  );
}
