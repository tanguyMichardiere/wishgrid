"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";
import { useMemo } from "react";
import type { Props as MenuProps } from "../../../../components/Menu";
import Menu from "../../../../components/Menu";
import { useCurrentUser } from "../../../../context/currentUser/hook";
import { useClientTranslations } from "../../../../utils/translations/client";

type Props = Pick<MenuProps, "position">;

export default function ExportMenu(props: Props): JSX.Element {
  const t = useClientTranslations("client.ExportMenu");
  const locale = useLocale();

  const currentUser = useCurrentUser();

  const menuItems = useMemo(
    () =>
      [
        {
          key: "json",
          children: "json",
          href: `/${locale}/user/wish-export/json`,
          download: `${currentUser.name}.json`,
        },
        {
          key: "csv",
          children: "csv",
          href: `/${locale}/user/wish-export/csv`,
          download: `${currentUser.name}.csv`,
        },
        {
          key: "docx",
          children: "docx",
          href: `/${locale}/user/wish-export/docx`,
          download: `${currentUser.name}.docx`,
        },
        {
          key: "pdf",
          children: "pdf",
          href: `/${locale}/user/wish-export/pdf`,
          download: `${currentUser.name}.pdf`,
        },
      ] as const,
    [locale, currentUser.name],
  );

  return (
    <Menu buttonClassName="btn" items={menuItems} menuClassName="w-48" position={props.position}>
      {t("export")}
      <ChevronDownIcon aria-hidden="true" className="-mr-1 ml-2 h-5 w-5" />
    </Menu>
  );
}
