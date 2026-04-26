import { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Carcard from "./components/Carcard";
import { getRecommendations } from "./api/api";

function App() {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const matchesRef = useRef(null);

  const handleSubmit = async (data) => {
    setLoading(true);
    setError("");
    setHasSearched(true);
    try {
      const res = await getRecommendations(data);
      setCars(res.cars ?? []);
      setTimeout(() => {
        matchesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Hero onSubmit={handleSubmit} loading={loading} />

        {(loading || hasSearched) && (
          <section
            ref={matchesRef}
            className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Your Top Matches
              </h2>
              <p className="mt-3 text-base text-slate-500">
                Hand-picked by AI based on your preferences
              </p>
            </div>

            {error && (
              <p className="mt-8 text-center text-sm text-red-600">{error}</p>
            )}

            {loading && (
              <>
                <div className="mt-8 flex items-center justify-center gap-3 text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="h-5 w-5 animate-spin text-orange-500"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <span className="text-sm">
                    Asking the AI for your top picks…
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-72 animate-pulse rounded-3xl border border-slate-200 bg-slate-50"
                    />
                  ))}
                </div>
              </>
            )}

            {!loading && !error && cars.length === 0 && (
              <p className="mt-10 text-center text-slate-500">
                No matches found. Try a different budget or usage.
              </p>
            )}

            {!loading && cars.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cars.map((car, idx) => (
                  <Carcard key={`${car.make}-${car.model}-${idx}`} car={car} />
                ))}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6">
        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} AI Car Advisor — Smarter car decisions,
          powered by AI.
        </p>
      </footer>
    </div>
  );
}

export default App;
