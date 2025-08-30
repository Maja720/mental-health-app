import { useMemo, useState } from 'react';
import CounselorCard from './CounselorCard';
import BookModal from './BookModal';

const seed = [
  {
    id: '1',
    name: 'Dr Ana Petrović',
    specialty: 'Psihoterapeut za adolescente',
    bio: 'Pomažem mladima da razviju emocionalnu otpornost i prevaziđu anksioznost kroz empatični pristup.',
  },
  {
    id: '2',
    name: 'Jelena Stanojević',
    specialty: 'Klinički psiholog',
    bio: 'Pomažem u dijagnostikovanju i preporuci adekvatne terapije i psihoterapeuta.',
  },
  {
    id: '3',
    name: 'Dr Maja Nikolić',
    specialty: 'Psihoterapeut za poremećaje ličnosti',
    bio: 'Pomažem mladima i starijima u usklađivanju svakodnevnih obaveza i povezivanju sa drugim ljudima.',
  },
  {
    id: '4',
    name: 'Jovana Nikolić',
    specialty: 'Psihoterapeut za parove',
    bio: 'Radim sa parovima na razvoju emocionalne inteligencije i prevazilaženju problema u vezama.',
  },
  // dodaj još po potrebi…
];

export default function Counselors() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seed;
    return seed.filter(
      (x) =>
        x.name.toLowerCase().includes(q) ||
        x.specialty.toLowerCase().includes(q) ||
        x.bio.toLowerCase().includes(q)
    );
  }, [query]);

  const onBook = (c) => {
    setCurrent(c);
    setOpen(true);
  };

  const onConfirm = ({ date, time, counselor }) => {
    // ovde možeš poslati u Firestore/Realtime DB
    console.log('Zakazano:', { date, time, counselor });
    // možeš dodati toast/poruku uspeha po želji
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* search + filter */}
        <div className="flex items-center gap-3">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Pretraži savetnika..."
              className="w-full rounded-full border border-blue-200 bg-white/80 px-11 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {/* lupa */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 21 15.8 15.8m1.87-5.06a6.94 6.94 0 1 1-13.88 0 6.94 6.94 0 0 1 13.88 0Z" />
            </svg>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-blue-200/70 px-4 py-2 text-sm font-medium text-blue-900 shadow ring-1 ring-black/5 hover:bg-blue-200"
            title="Filter (demo)"
          >
            {/* filter ikonica */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 5h18v2H3V5zm4 6h10v2H7v-2zm3 6h4v2h-4v-2z" />
            </svg>
            Filter…
          </button>
        </div>

        {/* grid kartica */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CounselorCard key={c.id} item={c} onBook={onBook} />
          ))}
        </div>
      </div>

      <BookModal
        open={open}
        onClose={() => setOpen(false)}
        counselor={current}
        onConfirm={onConfirm}
      />
    </main>
  );
}
