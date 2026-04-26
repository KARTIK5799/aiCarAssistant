import { useState } from "react";

const BUDGET_OPTIONS = [
  { label: "Under ₹5L", min: 0, max: 500000 },
  { label: "₹5L – ₹10L", min: 500000, max: 1000000 },
  { label: "₹10L – ₹20L", min: 1000000, max: 2000000 },
  { label: "₹20L – ₹30L", min: 2000000, max: 3000000 },
  { label: "₹30L – ₹50L", min: 3000000, max: 5000000 },
  { label: "Above ₹50L", min: 5000000, max: 20000000 },
];

const USAGE_OPTIONS = ["City", "Highway", "Mixed", "Off-road", "Family trips"];

const FAMILY_OPTIONS = [
  { label: "1 – 2", value: 2 },
  { label: "3 – 4", value: 4 },
  { label: "5 – 6", value: 6 },
  { label: "7+", value: 7 },
];

const SparkleIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2 9.91 8.91 3 11l6.91 2.09L12 20l2.09-6.91L21 11l-6.91-2.09L12 2Z" />
  </svg>
);

const SpinnerIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    className={`animate-spin ${className}`}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const ChevronDownIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const selectClass =
  "w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-base text-slate-900 shadow-sm transition-colors hover:border-slate-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200";

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label className="text-base font-semibold text-slate-900">{label}</label>
      <div className="relative">
        {children}
        <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

export default function AdvisorForm({ onSubmit, loading = false }) {
  const [budgetIdx, setBudgetIdx] = useState("");
  const [usage, setUsage] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");

  const isValid = budgetIdx !== "" && usage && familyMembers;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid || loading) return;
    const budget = BUDGET_OPTIONS[Number(budgetIdx)];
    onSubmit?.({
      budgetMin: budget.min,
      budgetMax: budget.max,
      usage,
      familyMembers: Number(familyMembers),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Field label="Budget">
          <select
            value={budgetIdx}
            onChange={(e) => setBudgetIdx(e.target.value)}
            className={selectClass}
          >
            <option value="" disabled>
              Select budget
            </option>
            {BUDGET_OPTIONS.map((opt, idx) => (
              <option key={opt.label} value={idx}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Usage">
          <select
            value={usage}
            onChange={(e) => setUsage(e.target.value)}
            className={selectClass}
          >
            <option value="" disabled>
              Where you'll drive
            </option>
            {USAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Family Size">
          <select
            value={familyMembers}
            onChange={(e) => setFamilyMembers(e.target.value)}
            className={selectClass}
          >
            <option value="" disabled>
              How many people
            </option>
            {FAMILY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        aria-busy={loading}
      >
        {loading ? (
          <SpinnerIcon className="h-5 w-5" />
        ) : (
          <SparkleIcon className="h-5 w-5" />
        )}
        {loading ? "Finding your matches..." : "Get Recommendation"}
      </button>

      <p className="mt-4 text-center text-sm text-slate-500">
        Free <span className="mx-1">•</span> No signup required
        <span className="mx-1">•</span> Personalized in seconds
      </p>
    </form>
  );
}
