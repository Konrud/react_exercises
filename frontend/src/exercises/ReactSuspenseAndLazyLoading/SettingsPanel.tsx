import React from "react";

export const SettingsPanel: React.FC = React.memo(() => {
  console.log(`SettingsPanel rendered`);
  return (
    <div className="c-settings-panel">
      <h3>Settings Panel</h3>
      <p>This panel was lazy loaded!</p>
    </div>
  );
});

export default SettingsPanel;
