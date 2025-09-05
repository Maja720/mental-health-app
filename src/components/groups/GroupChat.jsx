import { useEffect, useMemo, useRef, useState } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import { useQueryRT } from '../../hooks/useQuery';

const fmtDateTime = (d) =>
  d
    .toLocaleString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(/\./g, '.');

export default function GroupChat({ groupId, groupName, canWrite }) {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const msgsQ = useMemo(() => {
    if (!groupId) return null;
    return query(
      collection(db, 'supportGroups', groupId, 'discussions'),
      orderBy('createdAt', 'asc')
    );
  }, [groupId]);

  const { docs: messages = [], loading } = useQueryRT(msgsQ);

  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = async () => {
    const clean = (text || '').trim();
    if (!clean || !uid || !groupId) return;
    setSending(true);
    try {
      await addDoc(collection(db, 'supportGroups', groupId, 'discussions'), {
        text: clean,
        userId: uid,
        createdAt: serverTimestamp(),
      });
      setText('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
      <div className="mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-blue-700"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4 4h16v10H5.17L4 15.17V4zm0-2a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z" />
        </svg>
        <h3 className="text-lg font-semibold text-blue-900">
          Chat – {groupName || 'Grupa'}
        </h3>
      </div>

      <div className="max-h-[420px] overflow-y-auto rounded-xl bg-blue-50/40 p-4 ring-1 ring-black/5">
        {loading && (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-white/70 ring-1 ring-black/5"
              />
            ))}
          </div>
        )}

        {!loading && messages.length === 0 && (
          <p className="text-sm text-gray-500">
            Još nema poruka. Budi prvi/va da napišeš nešto! 😊
          </p>
        )}

        {!loading &&
          messages.map((m) => {
            const dt = m.createdAt?.toDate ? m.createdAt.toDate() : null;
            const mine = uid && m.userId === uid;
            return (
              <div
                key={m.id}
                className={[
                  'mb-3 flex',
                  mine ? 'justify-end' : 'justify-start',
                ].join(' ')}
              >
                <div
                  className={[
                    'max-w-[75%] rounded-2xl px-4 py-2 shadow ring-1 ring-black/5',
                    mine ? 'bg-blue-600 text-white' : 'bg-white text-gray-800',
                  ].join(' ')}
                >
                  <p className="whitespace-pre-wrap break-words break-all">
                    {m.text}
                  </p>
                  <div
                    className={[
                      'mt-1 text-[10px]',
                      mine ? 'text-white/80' : 'text-gray-500',
                    ].join(' ')}
                  >
                    {dt ? fmtDateTime(dt) : ''}
                  </div>
                </div>
              </div>
            );
          })}
        <div ref={endRef} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={canWrite ? 'Napišite poruku…' : 'Samo za čitanje'}
          disabled={!canWrite}
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
        <button
          onClick={handleSend}
          disabled={!canWrite || !text.trim() || sending}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 disabled:opacity-60"
        >
          Pošalji
        </button>
      </div>
    </div>
  );
}
