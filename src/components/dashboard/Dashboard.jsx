import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import TileCard from './TileCard';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase/firebaseConfig';
import { collection, query, orderBy, limit, where } from 'firebase/firestore';
import { useQueryRT } from '../../hooks/useQuery';

function toDateSafe(d) {
  return d?.toDate ? d.toDate() : new Date(d);
}
function fmtFromTS(ts) {
  if (!ts?.toDate) return '—';
  const dt = ts.toDate();
  return `${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const nowRef = useRef(new Date());

  const lastJournalQ = useMemo(() => {
    if (!uid) return null;
    return query(
      collection(db, 'users', uid, 'journalEntries'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
  }, [uid]);
  const { docs: lastJournalDocs, loading: journalLoading } =
    useQueryRT(lastJournalQ);
  const lastJournal = lastJournalDocs?.[0] ?? null;

  const lastTwoMoodQ = useMemo(() => {
    if (!uid) return null;
    return query(
      collection(db, 'users', uid, 'moodEntries'),
      orderBy('createdAt', 'desc'),
      limit(2)
    );
  }, [uid]);
  const { docs: moodDocs, loading: moodLoading } = useQueryRT(lastTwoMoodQ);

  const currentMood = moodDocs?.[0] ?? null;
  const previousMood = moodDocs?.[1] ?? moodDocs?.[0] ?? null;

  const nextApptQ = useMemo(() => {
    if (!uid) return null;
    return query(
      collection(db, 'users', uid, 'appointments'),
      orderBy('date', 'asc'),
      where('date', '>=', nowRef.current),
      limit(1)
    );
  }, [uid]);
  const { docs: apptDocs, loading: apptLoading } = useQueryRT(nextApptQ);

  const nextAppt = apptDocs?.[0]
    ? { ...apptDocs[0], _date: toDateSafe(apptDocs[0].date) }
    : null;

  return (
    <main className="flex min-h-[calc(100vh-150px)] items-center justify-center bg-blue-50/50">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 auto-rows-fr">
        <TileCard title="Poslednji unos u dnevnik" icon="✍️" tone="pink">
          {journalLoading ? (
            <div className="text-sm text-gray-600">Učitavam…</div>
          ) : lastJournal ? (
            <div className="space-y-2">
              <blockquote className="rounded-xl bg-white/60 p-4 text-gray-700 shadow-sm">
                {lastJournal.text ?? '—'}
              </blockquote>
              {lastJournal.createdAt && (
                <p className="text-xs text-gray-500 text-right">
                  {fmtFromTS(lastJournal.createdAt)}
                </p>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              Još uvek nemate unosa u dnevnik.{' '}
              <Link to="/journal" className="text-blue-600 underline">
                Dodajte prvi unos
              </Link>
              .
            </div>
          )}
        </TileCard>

        <TileCard title="Trenutno raspoloženje" icon="😊" tone="blue">
          {moodLoading ? (
            <div className="text-sm text-gray-600">Učitavam…</div>
          ) : currentMood ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-50 text-3xl font-semibold text-blue-900 shadow">
                {currentMood.mood ?? '–'}
              </div>
              {currentMood.createdAt && (
                <p className="text-sm text-gray-600">
                  {fmtFromTS(currentMood.createdAt)}
                </p>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-600 text-center">
              Nemate zapisa raspoloženja.{' '}
              <Link to="/mood" className="text-blue-600 underline">
                Unesite ovde
              </Link>
              .
            </div>
          )}
        </TileCard>

        <TileCard title="Poslednje raspoloženje" icon="🕒" tone="blue">
          {moodLoading ? (
            <div className="text-sm text-gray-600">Učitavam…</div>
          ) : previousMood ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-50 text-3xl font-semibold text-blue-900 shadow">
                {previousMood.mood ?? '–'}
              </div>
              {previousMood.createdAt && (
                <p className="text-sm text-gray-600">
                  {fmtFromTS(previousMood.createdAt)}
                </p>
              )}
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              Nema prethodnih zapisa raspoloženja.
            </div>
          )}
        </TileCard>

        <TileCard title="Zakazani sastanak" icon="🗓️" tone="pink">
          {apptLoading ? (
            <div className="text-sm text-gray-600">Učitavam…</div>
          ) : nextAppt ? (
            <div className="space-y-1 rounded-xl bg-white/60 p-4 text-gray-700 shadow-sm">
              <p className="text-sm text-gray-600">Sastanak sa:</p>
              <p className="font-medium">
                {nextAppt.counselorName ?? 'Savetnik'}
              </p>
              <p className="text-sm text-gray-600">
                {fmtFromTS({ toDate: () => nextAppt._date })}
              </p>
            </div>
          ) : (
            <div className="text-sm text-gray-600">
              Trenutno nemate zakazane sastanke.
            </div>
          )}
        </TileCard>
      </div>
    </main>
  );
}
