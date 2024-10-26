import { getLocale } from "next-intl/server";
import type { JSX, ReactNode } from "react";
import { redirect } from "../../../../../i18n/routing";
import { getFriendsStatus } from "../../../../../utils/server-queries/friends/status";
import { getCurrentUser } from "../../../../../utils/server-queries/users/get-current";
import type { Params } from "./params";

type Props = {
	params: Promise<Params>;
	children: ReactNode;
};

export default async function UserIdLayout(props: Props): Promise<JSX.Element> {
	const locale = await getLocale();

	const params = await props.params;

	const currentUser = await getCurrentUser();
	if (currentUser.id === params.id) {
		redirect({ href: "/user", locale });
	}

	const friendsStatus = await getFriendsStatus(params.id);
	if (friendsStatus) {
		redirect({ href: `/friend/${params.id}`, locale });
	}

	return <>{props.children}</>;
}
