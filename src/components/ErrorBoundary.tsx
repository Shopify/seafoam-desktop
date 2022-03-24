import React, { ErrorInfo, PropsWithChildren } from "react";
import { Result } from "antd";

interface State {
  error: Nullable<Error>;
  errorInfo: Nullable<ErrorInfo>;
}

export class ErrorBoundary extends React.Component<
  PropsWithChildren<unknown>,
  State
> {
  constructor(props: PropsWithChildren<unknown>) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    window.logger.error(error, errorInfo);

    this.setState({ error: error, errorInfo: errorInfo });
  }

  override render() {
    if (this.state.error) {
      return (
        <Result
          status="500"
          title="An unexpected error occurred"
          subTitle={
            <div>
              <p>
                Please report the error to the{" "}
                <a
                  href="https://github.com/Shopify/seafoam-gui/issues"
                  target="_blank"
                >
                  Seafoam GUI team
                </a>
                .
              </p>
              <p>
                Unfortunately, this error is fatal and you will need to restart
                the application.
              </p>
            </div>
          }
          extra={
            <div>
              <span>{this.state.error.message}:</span>
              <pre>{this.state.error.stack}</pre>
            </div>
          }
        ></Result>
      );
    }

    return this.props.children;
  }
}
