import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import cx from "classix";
import type { JSX } from "react";

type Props = {
  type?: "info" | "success" | "warning" | "error";
  text: string;
};

export default function Alert(props: Props): JSX.Element {
  return (
    <div
      className={cx(
        "alert max-w-sm",
        props.type === "info" && "alert-info",
        props.type === "success" && "alert-success",
        props.type === "warning" && "alert-warning",
        props.type === "error" && "alert-error",
      )}
    >
      {(props.type === undefined || props.type === "info") && (
        <InformationCircleIcon className="h-6 w-6" />
      )}
      {props.type === "success" && <CheckCircleIcon className="h-6 w-6" />}
      {props.type === "warning" && <ExclamationTriangleIcon className="h-6 w-6" />}
      {props.type === "error" && <XCircleIcon className="h-6 w-6" />}
      <span>{props.text}</span>
    </div>
  );
}
