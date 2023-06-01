import type { User } from "@clerk/nextjs/dist/types/server";
import { cx } from "classix";
import Image from "next/image";

type Size = "small" | "large";

type Props = {
  user: Pick<User, "imageUrl">;
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
  return (
    <div className="avatar">
      <div className={cx("rounded-full", sizes[props.size].className)}>
        <Image
          alt="profile picture"
          height={sizes[props.size].size}
          src={props.user.imageUrl}
          width={sizes[props.size].size}
        />
      </div>
    </div>
  );
}
