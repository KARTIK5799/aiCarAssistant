import AdvisorForm from "./AdvisorForm";

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

export default function Hero({ onSubmit, loading }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-orange-50/60 to-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-16 text-center sm:py-20 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur">
          <SparkleIcon className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium text-orange-700">
            Smart car recommendations
          </span>
        </div>

        <h1 className="mt-8 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Find Your Perfect Car
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-slate-600 sm:text-xl">
          Get personalized car recommendations based on your needs, budget and
          lifestyle.
        </p>

        <div className="mt-10 w-full max-w-4xl">
          <AdvisorForm onSubmit={onSubmit} loading={loading} />
        </div>
      </div>
    </section>
  );
}
