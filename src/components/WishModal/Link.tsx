import type { JSX } from "react";

type Props = {
  link: string;
};

export default function Link(props: Props): JSX.Element {
  return (
    <>
      {props.link.length > 0 && (
        <a className="link break-all" href={props.link} rel="noreferrer" target="_blank">
          {props.link}
        </a>
      )}
    </>
  );
}
