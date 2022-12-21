import type { DynamicOptionsLoadingProps } from "next/dynamic";

import Spinner from "./Spinner";

export default function DynamicLoadingSpinner(_props: DynamicOptionsLoadingProps): JSX.Element {
  return (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
}
