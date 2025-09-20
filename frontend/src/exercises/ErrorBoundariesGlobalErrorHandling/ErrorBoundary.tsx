import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
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

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

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
          <h2>Something went terribly wrong.</h2>
          <div>
            <p>{this.state.error?.message}</p>
            <p>{this.state.error?.cause?.toString()}</p>
          </div>
          <div>
            <button onClick={this.handleReset.bind(this)}>Try again</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
