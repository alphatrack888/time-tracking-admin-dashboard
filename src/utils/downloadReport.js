import { getBaseUrl } from "./baseUrl";

// Synchronous report downloads (single-employee attendance, monthly
// timesheet) aren't a good fit for the JSON-shaped axiosBaseQuery RTK Query
// uses everywhere else, so — matching the existing pattern in the company
// dashboard's EmployeeReportModal — this hits the backend directly with
// fetch and streams the response into a browser download as a blob.
// Throws with the backend's own error message when the response isn't ok,
// so callers can show it via toast.
export async function downloadReport(path, params, filename) {
  const accessToken = sessionStorage.getItem("accessToken");
  const query = new URLSearchParams(
    Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ""))
  ).toString();
  const url = `${getBaseUrl().replace(/\/$/, "")}${path}?${query}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    let message = "Failed to generate report";
    try {
      const body = await response.json();
      message = body?.message || message;
    } catch {
      // Response wasn't JSON — keep the generic message.
    }
    throw new Error(message);
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}
