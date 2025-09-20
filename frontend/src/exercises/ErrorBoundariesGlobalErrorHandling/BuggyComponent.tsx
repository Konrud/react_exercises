import React, { useState } from "react";

export const BuggyComponent = () => {
  const [counter, setCounter] = useState(0);

  if (counter === 3) {
    throw new Error("I crashed!");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        border: "1px solid black",
        padding: "10px",
        margin: "10px",
      }}
    >
      <p>Counter: {counter}</p>
      <hr />
      <p>
        Click the button to increase the counter.When the counter reaches 3, the component will
        throw an error.This simulates a component that crashes during rendering.
      </p>
      <button onClick={() => setCounter((prevCounter) => prevCounter + 1)}>
        Increment Counter
      </button>
    </div>
  );
};

export default BuggyComponent;
