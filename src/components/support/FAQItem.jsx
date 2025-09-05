import { useState } from 'react';

export default function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  const answered = Boolean((a || '').trim());
  const answerText = answered
    ? a
    : 'Pitanje je zabeleženo. Odgovor stiže uskoro.';

  return (
    <div className="rounded-2xl bg-white/95 p-4 shadow-md ring-1 ring-black/5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-base font-semibold text-gray-900">{q}</span>
        <svg
          className={`h-5 w-5 text-gray-600 transition ${
            open ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 15.5 5 8.5l1.4-1.4L12 12.7l5.6-5.6L19 8.5l-7 7Z" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all ${
          open ? 'mt-2 max-h-40' : 'max-h-0'
        }`}
      >
        <p
          className={`rounded-xl p-3 text-sm leading-6 shadow-inner ${
            answered
              ? 'bg-green-50 text-gray-800'
              : 'bg-yellow-50 text-gray-700'
          }`}
        >
          {answerText}
        </p>
      </div>
    </div>
  );
}
