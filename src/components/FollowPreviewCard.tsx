import { useCallback, useState } from "react";

import type { User } from "@prisma/client";

import FollowModal from "./FollowModal";

type Props = {
  user: User;
};

export default function FollowPreviewCard(props: Props): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const openModal = useCallback(function () {
    setShowModal(true);
  }, []);
  const closeModal = useCallback(function () {
    setShowModal(false);
  }, []);

  return (
    <>
      <button onClick={openModal} type="button">
        {props.user.name ?? props.user.id}
      </button>
      <FollowModal close={closeModal} show={showModal} user={props.user} />
    </>
  );
}
