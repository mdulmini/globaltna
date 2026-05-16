const STYLES = {
    "Open":        "bg-green-100 text-green-700 border border-green-200",
    "In Progress": "bg-amber-100 text-amber-700 border border-amber-200",
    "Closed":      "bg-slate-100 text-slate-500 border border-slate-200",
  };
  
  export default function StatusBadge({ status }) {
    return (
      <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${STYLES[status] || "bg-gray-100 text-gray-500"}`}>
        {status}
      </span>
    );
  }