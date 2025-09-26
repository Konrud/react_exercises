import React, { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };

    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, info);
    // Here we can also log the error to an external service

    // Enhanced error context for monitoring services
    const errorContext = {
      error: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    console.log(`\n===============\n`);
    console.log(errorContext);
    console.log(`\n===============\n`);

    // Integration point for error monitoring (Sentry, DataDog, etc.)
    // ErrorMonitoringService.captureError(errorContext);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            border: "2px solid crimson",
            borderRadius: "5px",
            backgroundColor: "#ffe6e6",
          }}
        >
          <h2>Something went terribly wrong (UI crash).</h2>
          <div>
            <button onClick={this.handleReset}>Try again</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
