import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <h1>404 - Page Not Found</h1>
      <Link className="link" href="/">
        Home Page
      </Link>
    </div>
  );
}
