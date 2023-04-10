import type { User } from "@prisma/client";
import { cx } from "classix";
import Identicon from "identicon.js";
import Image from "next/image";
import { useMemo } from "react";

type Size = "small" | "large";

type Props = {
  user: Pick<User, "id" | "image">;
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
  const imageSrc = useMemo(
    () => props.user.image ?? `data:image/png;base64,${new Identicon(props.user.id).toString()}`,
    [props.user.image, props.user.id]
  );

  return (
    <div className="avatar">
      <div className={cx("rounded-full", sizes[props.size].className)}>
        <Image
          alt="profile picture"
          height={sizes[props.size].size}
          src={imageSrc}
          width={sizes[props.size].size}
        />
      </div>
    </div>
  );
}
