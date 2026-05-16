import Link from "next/link";
import StatusBadge from "./StatusBadge";

const CATEGORY_ICONS = {
  Plumbing:   "🔧",
  Electrical: "⚡",
  Painting:   "🎨",
  Joinery:    "🪵",
  Other:      "📋",
};

export default function JobCard({ job }) {
  const icon = CATEGORY_ICONS[job.category] || "📋";

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-xl border border-slate-200 p-5 h-full flex flex-col justify-between hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-blue-700 transition-colors">
              {job.title}
            </h2>
            <StatusBadge status={job.status} />
          </div>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
            {job.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-3 text-xs text-slate-400">
          {job.category && (
            <span>{icon} {job.category}</span>
          )}
          {job.location && (
            <span>📍 {job.location}</span>
          )}
          <span>🕐 {new Date(job.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>
    </Link>
  );
}