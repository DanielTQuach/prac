import { useEffect, useState } from "react";

/**
 * @type {Object} UsageMetrics
 * @property {number} success - Number of successful API calls
 * @property {number} failure - Number of failed API calls
 * @property {string} window - Time window represented by the metrics, e.g "1h".
 */

/**
 * Fetch usage metrics from the backend API
 * 
 * Expected request:
 * - Method: GET
 * - Path: /api/usage
 * - Query params: optional
 * 
 * Expected response body:
 * {
 * "success": number,
 * "failure": number,
 * "window:" string
 * }
 * 
 * @param {AbortSignal} signal - Abort signal used to cancel request when component unmounts
 * @returns {Promise<UsageMetrics>} Parsed usage metrics JSON from backend
 * @throws {error} Throws if the HTTP response is not sucessful or json parsing fails
 */

async function fetchUsageMetrics(signal) {
  const response = await fetch("api/usage", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch usage metrics: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
