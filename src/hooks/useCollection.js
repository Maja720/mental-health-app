import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export function useCollection(
  path,
  sortField = 'createdAt',
  direction = 'desc'
) {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!path) return;

    const q = query(collection(db, path), orderBy(sortField, direction));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setDocs(data);
      setLoading(false);
    });

    return () => unsub();
  }, [path, sortField, direction]);

  return { docs, loading };
}
