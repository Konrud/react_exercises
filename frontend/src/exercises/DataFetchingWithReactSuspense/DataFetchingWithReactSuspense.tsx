import React, { Suspense } from "react";
import "./DataFetchingWithReactSuspense.css";
import Profiles from "./Profiles";
import { createResource } from "./createResource";
import fetchUsers from "./fetchUsers";

/**
 * Simulate data fetching with a Promise

 * Wrap it in a resource-like API

 * Use Suspense to suspend rendering until the data is ready
 */

const userResource = createResource(fetchUsers(3));

export const DataFetchingWithReactSuspense: React.FC = () => {
  return (
    <div className="l-data-fetching-with-suspense">
      <h2 className="c-data-fetching-with-suspense-title">
        Data Fetching With React Suspense
      </h2>

      <div className="l-results-container">
        <Suspense fallback={<div>Loading Users Data...</div>}>
          <Profiles resource={userResource} />
        </Suspense>
      </div>
    </div>
  );
};

export default DataFetchingWithReactSuspense;
