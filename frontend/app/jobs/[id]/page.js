"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchJob, updateJobStatus, deleteJob } from "../../../lib/api";
import StatusBadge from "../../../components/StatusBadge";

const STATUSES = ["Open", "In Progress", "Closed"];
const ICONS    = { Plumbing: "🔧", Electrical: "⚡", Painting: "🎨", Joinery: "🪵", Other: "📋" };

export default function JobDetailPage() {
  const { id } = useParams();
  const router  = useRouter();
  const [job,      setJob]      = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchJob(id).then(setJob).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [id]);

  const handleStatusChange = async (e) => {
    setUpdating(true);
    try { setJob(await updateJobStatus(id, e.target.value)); }
    catch (err) { alert("Failed: " + err.message); }
    finally { setUpdating(false); }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this request? Cannot be undone.")) return;
    setDeleting(true);
    try { await deleteJob(id); router.push("/"); }
    catch (err) { alert("Failed: " + err.message); setDeleting(false); }
  };

  if (loading) return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl border p-6 animate-pulse">
      <div className="h-6 bg-slate-200 rounded w-2/3 mb-4" />
      <div className="h-4 bg-slate-100 rounded w-full" />
    </div>
  );
  if (error) return (
    <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
      ⚠️ {error}
    </div>
  );
  if (!job) return null;

  const details = [
    { label: "Category", value: `${ICONS[job.category] || "📋"} ${job.category}` },
    { label: "Location", value: job.location    ? `📍 ${job.location}`    : null },
    { label: "Contact",  value: job.contactName  ? `👤 ${job.contactName}`  : null },
    { label: "Email",    value: job.contactEmail ? `✉️ ${job.contactEmail}` : null },
    { label: "Posted",   value: `🕐 ${new Date(job.createdAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}` },
  ].filter((d) => d.value);

  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={() => router.back()} className="text-blue-600 text-sm font-medium mb-5 hover:underline">
        ← Back to listings
      </button>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-blue-700 px-6 py-5 flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold text-white leading-snug">{job.title}</h1>
          <StatusBadge status={job.status} />
        </div>
        <div className="p-6">
          <p className="text-slate-600 leading-relaxed mb-6">{job.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {details.map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-lg p-3">
                <dt className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{label}</dt>
                <dd className="text-sm text-slate-800">{value}</dd>
              </div>
            ))}
          </div>
          <hr className="border-slate-100 mb-6" />
          <div className="flex items-center gap-3 mb-6">
            <label className="text-sm font-medium text-slate-700">Update Status:</label>
            <select value={job.status} onChange={handleStatusChange} disabled={updating}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
            {updating && <span className="text-xs text-slate-400 animate-pulse">Saving…</span>}
          </div>
          <button onClick={handleDelete} disabled={deleting}
            className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-100 transition disabled:opacity-60">
            {deleting ? "Deleting…" : "🗑 Delete this Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
