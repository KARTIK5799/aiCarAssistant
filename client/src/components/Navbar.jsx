export default function Navbar() {
  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white"
            >
              <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
              <circle cx="6.5" cy="16.5" r="2.5" />
              <circle cx="16.5" cy="16.5" r="2.5" />
            </svg>
          </span>
          <span className="text-xl font-bold text-slate-900">
            AI Car Advisor
          </span>
        </a>

        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-orange-500"
          >
            <path d="M12 2 9.91 8.91 3 11l6.91 2.09L12 20l2.09-6.91L21 11l-6.91-2.09L12 2Z" />
          </svg>
          <span className="text-sm font-medium text-slate-700">
            Powered by AI
          </span>
        </div>
      </nav>
    </header>
  );
}
