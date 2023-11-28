type Props = {
  link: string;
};

export default function Link(props: Props): JSX.Element | null {
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
