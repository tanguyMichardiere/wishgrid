import type { JSX } from "react";

type Props = {
  title: string;
};

export default function Title(props: Props): JSX.Element {
  return <h2 className="text-xl">{props.title}</h2>;
}
