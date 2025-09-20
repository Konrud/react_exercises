import "./ErrorBoundariesGlobalErrorHandling.css";
import { ErrorBoundary } from "./ErrorBoundary";
import BuggyComponent from "./BuggyComponent";

/*
Practise:
* Catch render-time errors in React components (not async errors)

* Display a fallback UI when something goes wrong

* Log errors for debugging
*/
/*-------------------------------------*/
/*
Important Note

React error boundaries only catch errors during render, 
lifecycle methods, and constructors of child components.
They do NOT catch:

* Errors inside event handlers

* Errors inside async callbacks (like fetch().then(...))

* Errors in server code

This is why we still need manual try/catch for async calls
*/

export const ErrorBoundariesGlobalErrorHandling: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="l-error-boundary-container">
        <h2 className="c-error-boundary-title">Error Boundaries for Global Error Handling</h2>
        <BuggyComponent />
      </div>
    </ErrorBoundary>
  );
};

export default ErrorBoundariesGlobalErrorHandling;
