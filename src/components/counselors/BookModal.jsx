import { useMemo, useState } from 'react';
import {
  addDoc,
  arrayRemove,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const fmtDate = (d) =>
  d
    .toLocaleDateString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\./g, '.');
const fmtTime = (d) =>
  d.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });

export default function BookModal({
  open,
  onClose,
  counselor,
  userId,
  onSuccess,
}) {
  const [slotTs, setSlotTs] = useState(null);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const slots = useMemo(() => {
    if (!counselor?.availabilityDates) return [];
    const now = new Date();
    return counselor.availabilityDates
      .filter((d) => d > now)
      .sort((a, b) => a - b)
      .map((d) => ({
        ts: Timestamp.fromDate(d),
        label: `${fmtDate(d)} — ${fmtTime(d)}`,
        d,
      }));
  }, [counselor]);

  const headerName = counselor
    ? counselor.name ||
      [counselor.firstName, counselor.lastName].filter(Boolean).join(' ')
    : '';

  if (!open) return null;

  const handleConfirm = async () => {
    if (!userId || !counselor?.id || !slotTs) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'users', userId, 'appointments'), {
        counselorId: counselor.id,
        firstName: counselor.firstName || '',
        lastName: counselor.lastName || '',
        userId,
        date: slotTs,
        notes: (notes || '').trim(),
        status: 'scheduled',
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, 'counselors', counselor.id), {
        availability: arrayRemove(slotTs),
      });

      onSuccess?.();
      onClose?.();
      setSlotTs(null);
      setNotes('');
    } catch (e) {
      console.error('Ne mogu da zakažem:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-gray-900">
          Zakazivanje – {headerName}
        </h3>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Termin
          </label>
          <select
            value={slotTs ? slotTs.toMillis() : ''}
            onChange={(e) => {
              const val = e.target.value;
              const chosen = slots.find((s) => String(s.ts.toMillis()) === val);
              setSlotTs(chosen ? chosen.ts : null);
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Izaberite dostupni termin…
            </option>
            {slots.map((s) => (
              <option key={s.ts.toMillis()} value={s.ts.toMillis()}>
                {s.label}
              </option>
            ))}
          </select>
          {!slots.length && (
            <p className="mt-2 text-sm text-red-600">
              Trenutno nema dostupnih termina.
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Beleška (opciono)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Kratka beleška, npr. tema razgovora…"
            className="w-full resize-none rounded-lg border border-gray-300 bg-white p-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
          >
            Otkaži
          </button>
          <button
            onClick={handleConfirm}
            disabled={!userId || !slotTs || saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? 'Zakazujem…' : 'Potvrdi'}
          </button>
        </div>
      </div>
    </div>
  );
}
