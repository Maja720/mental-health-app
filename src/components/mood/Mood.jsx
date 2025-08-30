import { useMemo, useState } from 'react';
import MoodScale from './MoodScale';
import MoodChart from './MoodChart';

const fmt = (d = new Date()) =>
  d
    .toLocaleDateString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\./g, '.');

const seed = [
  { date: '21.07.2025.', mood: 2.4, alt: 1.9 },
  { date: '23.07.2025.', mood: 1.1, alt: 1.2 },
  { date: '25.07.2025.', mood: 1.5, alt: 1.3 },
  { date: '04.08.2025.', mood: 2.7, alt: 3.0 },
  { date: '07.08.2025.', mood: 3.9, alt: 0.8 },
  { date: '10.08.2025.', mood: 1.2, alt: 3.4 },
  { date: '15.08.2025.', mood: 2.2, alt: 3.8 },
  { date: '20.08.2025.', mood: 0.0, alt: 2.3 },
  { date: '24.08.2025.', mood: 2.3, alt: 3.9 },
  { date: '26.08.2025.', mood: 0.5, alt: 0.8 },
];

export default function Mood() {
  const [value, setValue] = useState(7);
  const [note, setNote] = useState('');
  const [data, setData] = useState(seed);

  const canSave = value >= 1 && value <= 10;

  const handleSave = () => {
    const today = fmt(new Date());
    // alt: jednostavan “trend” – prosečna vrednost poslednja 3 unosa (demo)
    const last3 = data.slice(-3);
    const alt =
      last3.length > 0
        ? Math.min(
            10,
            Math.max(
              0,
              last3.reduce((s, d) => s + (Number(d.mood) || 0), 0) /
                last3.length
            )
          )
        : value;

    const next = [...data, { date: today, mood: Number(value), alt }];
    setData(next);
    setNote('');
  };

  const header = useMemo(
    () => (
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">
          Izaberite vaše raspoloženje danas:
        </p>
        <div className="mt-3">
          <MoodScale value={value} onChange={setValue} />
        </div>
      </div>
    ),
    [value]
  );

  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {header}

        {/* beleška (zelena kutija) */}
        <div className="mx-auto mt-6 max-w-3xl rounded-2xl bg-green-100 p-4 shadow-md ring-1 ring-black/5">
          <div className="mb-2 flex items-center gap-2 text-gray-700">
            {/* olovka */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            <span className="text-sm font-medium">
              Želite da dodate razlog ili belešku uz vaše raspoloženje?
            </span>
          </div>

          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Upišite kratku belešku (opciono)…"
            className="mt-1 w-full resize-none rounded-xl border border-gray-300 bg-white p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="mt-3 flex justify-end">
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-medium text-gray-800 shadow-md ring-1 ring-black/10 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {/* čekir ikon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
              </svg>
              Sačuvaj
            </button>
          </div>
        </div>

        {/* grafikon */}
        <div className="mt-10">
          <MoodChart data={data} />
        </div>
      </div>
    </main>
  );
}
