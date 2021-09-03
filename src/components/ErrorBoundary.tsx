import React, { ErrorInfo, PropsWithChildren } from "react";
import { Banner, Card } from "@shopify/polaris";

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
        <>
          <Banner status="critical" title="An unexpected error occurred">
            <div>{this.state.error}</div>
            <div>{this.state.errorInfo?.componentStack}</div>
          </Banner>
          <Card>
            <Card.Section>
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
            </Card.Section>
          </Card>
        </>
      );
    }

    return this.props.children;
  }
}
