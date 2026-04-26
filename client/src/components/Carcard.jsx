const CarIcon = ({ className = "" }) => (
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
    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
    <circle cx="6.5" cy="16.5" r="2.5" />
    <circle cx="16.5" cy="16.5" r="2.5" />
  </svg>
);

const CheckIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const XIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const formatINR = (n) => {
  if (!Number.isFinite(n)) return "";
  if (n >= 10000000) {
    const v = (n / 10000000).toFixed(1).replace(/\.0$/, "");
    return `₹${v}Cr`;
  }
  if (n >= 100000) {
    const v = (n / 100000).toFixed(1).replace(/\.0$/, "");
    return `₹${v}L`;
  }
  return `₹${n.toLocaleString("en-IN")}`;
};

export default function Carcard({ car }) {
  const {
    make,
    model,
    priceRangeLow,
    priceRangeHigh,
    description,
    pros = [],
    cons = [],
  } = car;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {make} {model}
          </h3>
          <p className="mt-1 text-base font-semibold text-orange-600">
            {formatINR(priceRangeLow)} – {formatINR(priceRangeHigh)}
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
          <CarIcon className="h-5 w-5" />
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <hr className="my-5 border-slate-100" />

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
          Pros
        </p>
        <ul className="mt-3 space-y-2">
          {pros.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-red-600">
          Cons
        </p>
        <ul className="mt-3 space-y-2">
          {cons.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
              <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
