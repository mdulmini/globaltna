const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res  = await fetch(`${BASE}${path}`, options);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Something went wrong");
  return json;
}

export const fetchJobs = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/jobs${qs ? `?${qs}` : ""}`);
};

export const fetchJob = (id) => request(`/api/jobs/${id}`);

export const createJob = (data) =>
  request("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updateJobStatus = (id, status) =>
  request(`/api/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

export const deleteJob = (id) =>
  request(`/api/jobs/${id}`, { method: "DELETE" });