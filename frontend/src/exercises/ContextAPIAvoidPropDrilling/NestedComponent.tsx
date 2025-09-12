import { useContext } from "react";
import ThemeToggler from "./ThemeToggler";
import { ThemeContext } from "../../contexts/ThemeContext";

export const NestedComponent: React.FC = () => {
  const ctx = useContext(ThemeContext);

  return (
    <div className="c-nested-component" data-theme={ctx?.theme}>
      <h3 className="c-nested-component__title">Nested Component</h3>
      <ThemeToggler />
    </div>
  );
};

export default NestedComponent;
