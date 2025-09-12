import { useState } from "react";

export const ControlledInput: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const isEmpty = value.length === 0;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleClear() {
    setValue("");
  }

  return (
    <section className="l-section">
      <h1 className="c-main-title">Controlled input practice</h1>

      <input
        className="c-input"
        type="text"
        id="name"
        maxLength={20}
        value={value}
        onChange={handleChange}
      />

      <p className="c-paragraph">{`Hello ${value.trim() || "stranger"}!`}</p>

      <p
        className={`c-hint-text${value.length >= 15 ? " c-hint-text--warning" : ""}`}
      >{`Characters ${value.length}`}</p>

      <button className="c-button" type="button" disabled={isEmpty} onClick={handleClear}>
        Clear
      </button>
    </section>
  );
};

export default ControlledInput;
