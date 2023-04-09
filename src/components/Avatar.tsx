import type { User } from "@prisma/client";
import Identicon from "identicon.js";
import Image from "next/image";
import { useMemo } from "react";

type Props = {
  user: Pick<User, "id" | "image">;
};

export default function Avatar(props: Props): JSX.Element {
  const imageSrc = useMemo(
    () => props.user.image ?? `data:image/png;base64,${new Identicon(props.user.id).toString()}`,
    [props.user.image, props.user.id]
  );

  return (
    <div className="avatar">
      <div className="w-10 rounded-full">
        <Image alt="profile picture" height={40} src={imageSrc} width={40} />
      </div>
    </div>
  );
}
