"use client";

import type { JSX } from "react";
import { useCreateFriendRequestMutation } from "../hooks/mutations/friend-requests/create";
import { useClientTranslations } from "../utils/translations/client";
import { MutationButton } from "./mutation-button";

type Props = { userId: string };

export function RequestFriendButton(props: Props): JSX.Element {
	const t = useClientTranslations("client.RequestFriendButton");

	const createFriendRequest = useCreateFriendRequestMutation();

	return (
		<MutationButton mutation={createFriendRequest} variables={{ userId: props.userId }}>
			{t("text")}
		</MutationButton>
	);
}
