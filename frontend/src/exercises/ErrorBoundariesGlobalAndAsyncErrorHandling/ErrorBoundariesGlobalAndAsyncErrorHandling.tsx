import "./ErrorBoundariesGlobalAndAsyncErrorHandling.css";
import { ErrorBoundary } from "./ErrorBoundary";
import BuggyComponent from "./BuggyComponent";
import BuggyAsyncComponent from "./BuggyAsyncComponent";
import GlobalErrorOverlay from "./GlobalErrorOverlay";
import GlobalErrorProvider from "./GlobalErrorProvider";

/*
Practise:
* Catch both UI render errors and async/network errors in a unified way

* Show a global fallback UI for critical errors

* Provide a recovery mechanism (reset, retry, or reload)
*/

export const ErrorBoundariesGlobalAndAsyncErrorHandling: React.FC = () => {
  return (
    <GlobalErrorProvider>
      <ErrorBoundary>
        <div className="l-error-boundary-container">
          <h2 className="c-error-boundary-title">
            Global Error Handling with Error Boundaries + Async Errors
          </h2>
          <div>
            <BuggyComponent />
          </div>
          <div>
            <BuggyAsyncComponent />
          </div>
          <GlobalErrorOverlay />
        </div>
      </ErrorBoundary>
    </GlobalErrorProvider>
  );
};

export default ErrorBoundariesGlobalAndAsyncErrorHandling;
