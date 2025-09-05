import { useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import { useQueryRT } from '../../hooks/useQuery';

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

export default function Mood() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [value, setValue] = useState(7);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const canSave = value >= 1 && value <= 10 && !!uid;

  const listQ = useMemo(() => {
    if (!uid) return null;
    return query(
      collection(db, 'users', uid, 'moodEntries'),
      orderBy('createdAt', 'asc')
    );
  }, [uid]);

  const { docs: rows = [], loading, error } = useQueryRT(listQ);

  const chartData = useMemo(() => {
    const base = rows
      .map((r) => {
        const ts = r.createdAt;
        const dt = ts?.toDate ? ts.toDate() : ts || null;
        return {
          dateStr: dt ? fmt(dt) : '',
          mood: Number(r.mood) || 0,
        };
      })
      .filter((x) => x.dateStr);

    const out = [];
    for (let i = 0; i < base.length; i++) {
      const last3 = base.slice(Math.max(0, i - 2), i + 1);
      const avg =
        last3.reduce((s, it) => s + (Number(it.mood) || 0), 0) / last3.length;
      out.push({
        date: base[i].dateStr,
        mood: Math.max(0, Math.min(10, base[i].mood)),
        alt: Math.max(0, Math.min(10, Number(avg.toFixed(2)))),
      });
    }
    return out;
  }, [rows]);

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'users', uid, 'moodEntries'), {
        mood: Number(value),
        note: (note || '').trim(),
        createdAt: serverTimestamp(),
      });
      setNote('');
    } finally {
      setSaving(false);
    }
  };

  const header = (
    <div className="text-center">
      <p className="text-sm font-medium text-gray-700">
        Izaberite vaše raspoloženje danas:
      </p>
      <div className="mt-3">
        <MoodScale value={value} onChange={setValue} />
      </div>
    </div>
  );

  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {header}

        <div className="mx-auto mt-6 max-w-3xl rounded-2xl bg-green-100 p-4 shadow-md ring-1 ring-black/5">
          <div className="mb-2 flex items-center gap-2 text-gray-700">
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
              disabled={!canSave || saving}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 font-medium text-gray-800 shadow-md ring-1 ring-black/10 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
              </svg>
              {saving ? 'Čuvam…' : 'Sačuvaj'}
            </button>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600">
              Ne mogu da učitam podatke.
            </p>
          )}
        </div>

        <div className="mt-10">
          <MoodChart data={chartData} loading={loading} />
        </div>
      </div>
    </main>
  );
}
