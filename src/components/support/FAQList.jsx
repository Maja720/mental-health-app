import { useMemo } from 'react';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useQueryRT } from '../../hooks/useQuery';
import FAQItem from './FAQItem';

export default function FAQList() {
  const listQ = useMemo(() => {
    return query(collection(db, 'faqs'), orderBy('createdAt', 'desc'));
  }, []);
  const { docs: faqs = [], loading } = useQueryRT(listQ);

  return (
    <div className="rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-black/5">
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Često postavljena pitanja (FAQ)
      </h2>

      <div className="space-y-4">
        {loading && (
          <>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-2xl bg-white/70 ring-1 ring-black/5"
              />
            ))}
          </>
        )}

        {!loading && faqs.length === 0 && (
          <p className="text-sm text-gray-600">Trenutno nema FAQ stavki.</p>
        )}

        {!loading &&
          faqs.map((it) => <FAQItem key={it.id} q={it.q} a={it.a} />)}
      </div>
    </div>
  );
}
