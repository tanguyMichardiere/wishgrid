type Props = {
  description: string;
};

export default function Description(props: Props): JSX.Element | null {
  if (props.description.length === 0) {
    return null;
  }

  return (
    <>
      {props.description.split("\n").map((line) => (
        <p className="break-words" key={line}>
          {line}
        </p>
      ))}
    </>
  );
}
