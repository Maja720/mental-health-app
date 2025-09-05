import { useMemo, useState } from 'react';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import { useQueryRT } from '../../hooks/useQuery';

import CounselorCard from './CounselorCard';
import BookModal from './BookModal';

export default function Counselors() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const listQ = useMemo(() => {
    return query(collection(db, 'counselors'), orderBy('createdAt', 'desc'));
  }, []);

  const { docs: rows = [], loading } = useQueryRT(listQ);

  const counselors = useMemo(() => {
    return rows.map((c) => {
      const availability = Array.isArray(c.availability) ? c.availability : [];
      const slots = availability
        .map((t) => (t?.toDate ? t.toDate() : t))
        .filter(Boolean)
        .sort((a, b) => a - b);

      return {
        id: c.id,
        firstName: c.firstName || '',
        lastName: c.lastName || '',
        name: [c.firstName, c.lastName].filter(Boolean).join(' ').trim() || '—',
        description: c.description || '',
        price: Number(c.price) || 0,
        specializations: Array.isArray(c.specializations)
          ? c.specializations
          : [],
        availabilityDates: slots,
      };
    });
  }, [rows]);

  const [queryStr, setQueryStr] = useState('');
  const filtered = useMemo(() => {
    const q = queryStr.trim().toLowerCase();
    if (!q) return counselors;
    return counselors.filter((x) => {
      const joinSpecs = x.specializations.join(', ').toLowerCase();
      return (
        x.name.toLowerCase().includes(q) ||
        (x.description || '').toLowerCase().includes(q) ||
        joinSpecs.includes(q)
      );
    });
  }, [queryStr, counselors]);

  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(null);
  const onBook = (c) => {
    setCurrent(c);
    setOpen(true);
  };

  const [toast, setToast] = useState(null);
  const handleSuccess = () => {
    setToast('✅ Uspešno zakazano!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50/50 relative">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-3">
          <div className="relative w-full">
            <input
              type="text"
              value={queryStr}
              onChange={(e) => setQueryStr(e.target.value)}
              placeholder="Pretraži savetnika..."
              className="w-full rounded-full border border-blue-200 bg-white/80 px-11 py-2 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 21 15.8 15.8m1.87-5.06a6.94 6.94 0 1 1-13.88 0 6.94 6.94 0 0 1 13.88 0Z" />
            </svg>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl bg-white/70 shadow ring-1 ring-black/5"
              />
            ))}

          {!loading &&
            filtered.map((c) => (
              <CounselorCard key={c.id} item={c} onBook={onBook} />
            ))}
        </div>
      </div>

      <BookModal
        open={open}
        onClose={() => setOpen(false)}
        counselor={current}
        userId={uid}
        onSuccess={handleSuccess}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-green-100 px-4 py-2 text-sm font-medium text-green-800 shadow">
          {toast}
        </div>
      )}
    </main>
  );
}
