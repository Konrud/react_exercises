import React from "react";

export interface IChildComponentProps {
  onClick: () => void;
}

export const ChildComponent: React.FC<IChildComponentProps> = React.memo(({ onClick }) => {
  console.log(`Child component rendered`);
  return <button onClick={onClick}>Click me</button>;
});

export default ChildComponent;
