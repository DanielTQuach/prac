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

/** 
 * Dashboard that loads backend usage data
 * 
 * Behavior:
 * - Fetches usage metrics on initial mount.
 * - Cancels in-flgiht request on unmount.
 * - Stores loading, error, and data states separately for UI handling
 * 
 * @returns {JSX.Element} simple metrics panel for backend usage data
 */

export default function App() {
  const [usage, setUsage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsageMetrics() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await fetchUsageMetrics(controller.singal);
        setUsage(data);
      } catch (error) {
        if (error.name !== "AbortError") { // no need to add message when exiting
          setErrorMessage(error.message || "Unexpected error when loading usage metrics. :(");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadUsageMetrics();

    return () => {
      controller.abort();
    };
  }, []); //

  if (isLoading) {
    return <div>Loading usage metrics...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!usage) {
    return <div>No usage data available,</div>;
  }

  return (
    <main>
      <h1>API Usage Dashboard</h1>
      <p>Window: {usage.window}</p>
      <p>Successful calls: {usage.success}</p>
      <p>Failed calls: {usage.failed}</p>
    </main>
  );
}
