import About from "../../../../../components/About";
import SignInButton from "../../../../../components/SignInButton";

export default function SignInPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-8">
      <SignInButton provider="discord" />
      <SignInButton provider="mock" />
      <About />
    </div>
  );
}
