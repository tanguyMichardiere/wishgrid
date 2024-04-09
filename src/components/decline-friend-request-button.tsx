"use client";

import type { JSX } from "react";
import { useDeclineFriendRequestMutation } from "../hooks/mutations/friend-requests/decline";
import { useClientTranslations } from "../utils/translations/client";
import { MutationButton } from "./mutation-button";

type Props = {
	userId: string;
};

export function DeclineFriendRequestButton(props: Props): JSX.Element {
	const t = useClientTranslations("client.DeclineFriendRequestButton");

	const declineFriendRequest = useDeclineFriendRequestMutation();

	return (
		<MutationButton
			className="btn-ghost"
			mutation={declineFriendRequest}
			variables={{ userId: props.userId }}
		>
			{t("text")}
		</MutationButton>
	);
}
