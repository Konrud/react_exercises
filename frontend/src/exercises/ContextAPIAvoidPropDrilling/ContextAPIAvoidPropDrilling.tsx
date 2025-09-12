import { ThemeContextProvider } from "../../contextProviders/ThemeContextProvider";
import "./ContextAPIAvoidPropDrilling.css";
import NestedComponent from "./NestedComponent";

/*
Practise:
* Creating a Context with a provider.

* Consuming context in deeply nested components.

* Updating shared state from a nested component.
*/

export const ContextAPIAvoidPropDrilling: React.FC = () => {
  return (
    <ThemeContextProvider>
      <div className="l-context-api-container">
        <h2 className="c-context-api-title">Theme Toggling using Context</h2>
        <NestedComponent />
      </div>
    </ThemeContextProvider>
  );
};

export default ContextAPIAvoidPropDrilling;
