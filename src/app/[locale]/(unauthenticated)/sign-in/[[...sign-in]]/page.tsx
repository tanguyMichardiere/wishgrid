import About from "../../../../../components/About";
import SignInButton from "../../../../../components/SignInButton";
import { NODE_ENV } from "../../../../../env";

export default function SignInPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center gap-8">
      <SignInButton provider="discord" />
      {NODE_ENV === "development" && <SignInButton provider="mock" />}
      <About />
    </div>
  );
}
