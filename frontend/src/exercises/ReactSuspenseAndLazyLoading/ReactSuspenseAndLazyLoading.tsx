import React, { Suspense } from "react";
import { useState } from "react";
import "./ReactSuspenseAndLazyLoading.css";

const SettingsPanel = React.lazy(() => {
  return new Promise((resolve) => {
    // Artificial delay
    setTimeout(() => {
      resolve(import("./SettingsPanel"));
    }, 3 * 1000);
  }).then((module) => module as { default: React.FC });
});

export const ReactSuspenseAndLazyLoading: React.FC = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const onShowSettingsClick = () => {
    setShowSettings((prevState) => !prevState);
  };

  return (
    <div className="l-suspense-lazy-loading-container">
      <h2 className="c-suspense-lazy-loading-title">React Suspense & Lazy Loading</h2>
      <div className="l-buttons-container">
        <button onClick={onShowSettingsClick}>
          {`${showSettings ? `Hide` : `Show`} settings`}
        </button>
      </div>
      <div className="l-settings-container">
        {showSettings && (
          <div className="l-settings-container__settings-panel-wrapper">
            <Suspense fallback={<p>Loading...</p>}>
              <SettingsPanel />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactSuspenseAndLazyLoading;
