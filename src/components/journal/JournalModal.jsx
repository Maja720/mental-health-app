export default function JournalModal({ open, onClose, date, text }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/10">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">{date}</span>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Zatvori modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto pr-1">
          <p className="whitespace-pre-line text-gray-800 break-words">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
