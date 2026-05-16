"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "../../lib/api";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

export default function NewJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", category: "Plumbing", location: "", contactName: "", contactEmail: "" });
  const [errors, setErrors]           = useState({});
  const [submitting, setSubmitting]   = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title       = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail)) e.contactEmail = "Enter a valid email";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setSubmitting(true);
    setServerError("");
    try {
      const job = await createJob(form);
      router.push(`/jobs/${job._id}`);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Post a New Request</h1>
        <p className="text-sm text-slate-500 mt-1">Fill in the details and tradespeople will be in touch</p>
      </div>
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
          ⚠️ {serverError}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title <span className="text-red-500">*</span></label>
          <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Leaking kitchen tap"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.title ? "border-red-400" : "border-slate-200"}`} />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description <span className="text-red-500">*</span></label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Describe the job in detail…"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none ${errors.description ? "border-red-400" : "border-slate-200"}`} />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Glasgow"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
            <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="Full name"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Email</label>
            <input type="email" name="contactEmail" value={form.contactEmail} onChange={handleChange} placeholder="you@example.com"
              className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.contactEmail ? "border-red-400" : "border-slate-200"}`} />
            {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
          </div>
        </div>
        <button type="submit" disabled={submitting}
          className="w-full bg-blue-700 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-800 transition disabled:opacity-60 text-sm">
          {submitting ? "Posting…" : "Post Request"}
        </button>
      </form>
    </div>
  );
}
