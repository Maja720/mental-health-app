export default function JournalCard({ date, text }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-md ring-1 ring-black/5">
      <div className="mb-2 flex items-center justify-between">
        {/* ikonica kalendara */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
          />
        </svg>
        <span className="text-sm font-semibold text-gray-700">{date}</span>
      </div>
      <p className="mt-1 line-clamp-4 text-sm text-gray-600">“{text}”</p>
    </div>
  );
}
