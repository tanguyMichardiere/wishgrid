import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

import { log } from "next-axiom";

type Props = {
  fallback: ReactNode;
  children: ReactNode;
};

type State = {
  error: unknown;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: unknown): State {
    return { error };
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    log.error("rendering error", { error, errorInfo });
  }

  render(): JSX.Element {
    if (this.state.error !== undefined) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}
