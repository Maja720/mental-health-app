import { useEffect, useRef, useState } from 'react';

const CARD_HEIGHT = 'h-40';

export default function JournalCard({ date, text, onOpen }) {
  const textRef = useRef(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      setOverflowing(el.scrollHeight > el.clientHeight + 2);
    }, 0);
    return () => clearTimeout(t);
  }, [text]);

  return (
    <div
      className={`rounded-xl bg-white p-4 shadow-md ring-1 ring-black/5 hover:shadow-lg transition-shadow ${CARD_HEIGHT} flex flex-col`}
    >
      <div className="mb-2 flex items-center justify-between">
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

      <div ref={textRef} className="flex-1 overflow-hidden">
        <p className="text-sm text-gray-600 break-words">“{text}”</p>
      </div>

      {overflowing && (
        <button
          onClick={onOpen}
          className="mt-2 text-xs text-blue-600 hover:underline self-start"
        >
          Prikaži više
        </button>
      )}
    </div>
  );
}
