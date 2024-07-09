"use client";

import type { JSX } from "react";
import { useCancelFriendRequestMutation } from "../hooks/mutations/friend-requests/cancel";
import { useClientTranslations } from "../utils/translations/client";
import { MutationButton } from "./mutation-button";

type Props = { userId: string };

export function CancelFriendRequestButton(props: Props): JSX.Element {
	const t = useClientTranslations("client.CancelFriendRequestButton");

	const cancelFriendRequest = useCancelFriendRequestMutation();

	return (
		<MutationButton mutation={cancelFriendRequest} variables={{ userId: props.userId }}>
			{t("text")}
		</MutationButton>
	);
}
