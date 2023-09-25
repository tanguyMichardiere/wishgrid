import cx from "classix";
import Image from "next/image";
import type { User } from "../server/db/types/user";
import { useClientTranslations } from "../utils/translations/client";

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
  user: User;
};

export default function Avatar(props: Props): JSX.Element {
  const t = useClientTranslations("clientComponents.Avatar");

  return (
    <div className={cx("avatar", props.className)}>
      <div className={cx("rounded-full", sizes[props.size].className)}>
        <Image
          alt={t("altText")}
          height={sizes[props.size].size}
          priority
          src={props.user.imageUrl}
          width={sizes[props.size].size}
        />
      </div>
    </div>
  );
}
