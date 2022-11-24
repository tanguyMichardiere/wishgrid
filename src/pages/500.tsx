import Link from "next/link";

export default function Page(): JSX.Element {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1>500 - Server Error</h1>
      <Link href="/">Home Page</Link>
    </div>
  );
}
