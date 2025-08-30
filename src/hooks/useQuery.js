import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';

export function useQueryRT(q) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(Boolean(q));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!q) {
      setDocs([]);
      setLoading(false);
      setError('');
      return;
    }

    setLoading(true);
    const unsub = onSnapshot(
      q,
      (snap) => {
        if ('docs' in snap) {
          setDocs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        } else {
          setDocs(snap.exists() ? [{ id: snap.id, ...snap.data() }] : []);
        }
        setLoading(false);
        setError('');
      },
      (err) => {
        console.error(err);
        setError('Ne mogu da učitam podatke.');
        setLoading(false);
      }
    );

    return () => unsub();
  }, [q]);

  return { docs, loading, error };
}
