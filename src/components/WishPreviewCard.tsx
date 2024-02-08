"use client";

import { ChatBubbleLeftRightIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import cx from "classix";
import type { JSX } from "react";
import { useRef } from "react";
import { useSetWishViewedMutation } from "../hooks/mutations/wishes/setViewed";
import type { Wish } from "../server/database/types/wishes";
import { useClientTranslations } from "../utils/translations/client";
import Card from "./Card";
import WishModal from "./WishModal";

type Props = {
  userId: string;
  wish: Wish;
};

export default function WishPreviewCard(props: Props): JSX.Element {
  const t = useClientTranslations("client.WishPreviewCard");

  const modalRef = useRef<HTMLDialogElement>(null);

  const setWishViewed = useSetWishViewedMutation(props.userId);

  function showModal() {
    modalRef.current?.showModal();
    if (!props.wish.viewed) {
      setWishViewed.mutate({ id: props.wish.id });
    }
  }

  return (
    <>
      <button className="w-full" onClick={showModal} type="button">
        <Card
          className={cx(
            "justify-between",
            !props.wish.viewed && "ring ring-primary ring-offset-base-100",
          )}
        >
          <div>{props.wish.title}</div>
          <div className="flex items-center gap-2">
            <div
              className="tooltip tooltip-left"
              data-tip={t("commentsTooltip", { count: props.wish.comments.length })}
            >
              <span className="badge gap-1">
                {props.wish.comments.length}
                <ChatBubbleLeftRightIcon className="h-4 w-4" />
              </span>
            </div>
            {props.wish.reservedBy !== null ? (
              <div className="tooltip tooltip-left" data-tip={t("reservedTooltip")}>
                <LockClosedIcon className="h-6 w-6" />
              </div>
            ) : (
              <div className="tooltip tooltip-left" data-tip={t("notReservedTooltip")}>
                <LockOpenIcon className="h-6 w-6" />
              </div>
            )}
          </div>
        </Card>
      </button>
      <WishModal ref={modalRef} userId={props.userId} wish={props.wish} />
    </>
  );
}
