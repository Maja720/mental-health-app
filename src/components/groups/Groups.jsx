import { useMemo, useState, useCallback } from 'react';
import {
  collection,
  orderBy,
  query,
  updateDoc,
  doc,
  arrayUnion,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import { useQueryRT } from '../../hooks/useQuery';

import GroupCard from './GroupCard';
import GroupChat from './GroupChat';

export default function Groups() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const listQ = useMemo(() => {
    return query(collection(db, 'supportGroups'), orderBy('createdAt', 'desc'));
  }, []);
  const { docs: groups = [], loading } = useQueryRT(listQ);

  const [queryStr, setQueryStr] = useState('');
  const filtered = useMemo(() => {
    const q = queryStr.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) => {
      const name = (g.name || '').toLowerCase();
      const desc = (g.description || '').toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [groups, queryStr]);

  const [current, setCurrent] = useState(null);

  const isJoined = useCallback(
    (g) => (Array.isArray(g.members) && uid ? g.members.includes(uid) : false),
    [uid]
  );

  const handleJoin = useCallback(
    async (g) => {
      if (!uid || !g?.id) return;

      await updateDoc(doc(db, 'supportGroups', g.id), {
        members: arrayUnion(uid),
      });

      await setDoc(
        doc(db, 'users', uid),
        { groupIds: arrayUnion(g.id) },
        { merge: true }
      );

      setCurrent({ id: g.id, name: g.name || 'Grupa' });
    },
    [uid]
  );

  const handleOpen = useCallback((g) => {
    if (!g?.id) return;
    setCurrent({ id: g.id, name: g.name || 'Grupa' });
  }, []);

  return (
    <main className=" bg-blue-50/50">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 8a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm7 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0Zm7 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM1 15.5C1 14.1 2.1 13 3.5 13h3A2.5 2.5 0 0 1 9 15.5V19H1v-3.5ZM10.5 13A2.5 2.5 0 0 0 8 15.5V19h8v-3.5A2.5 2.5 0 0 0 13.5 13h-3Zm7 0c1.4 0 2.5 1.1 2.5 2.5V19h-6v-3.5c0-1.4 1.1-2.5 2.5-2.5h1Z" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-900">
              Grupe podrške
            </h1>
          </div>

          <div className="relative w-72 max-w-[60vw]">
            <input
              type="text"
              value={queryStr}
              onChange={(e) => setQueryStr(e.target.value)}
              placeholder="Pretraži grupe..."
              className="w-full rounded-full border border-blue-200 bg-white/80 px-10 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21 21 15.8 15.8m1.87-5.06a6.94 6.94 0 1 1-13.88 0 6.94 6.94 0 0 1 13.88 0Z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-48 animate-pulse rounded-2xl bg-white/70 shadow ring-1 ring-black/5"
              />
            ))}

          {!loading &&
            filtered.map((g) => (
              <div key={g.id} className="relative">
                <GroupCard
                  item={{
                    id: g.id,
                    name: g.name || 'Bez naziva',
                    desc: g.description || '—',
                    membersCount: Array.isArray(g.members)
                      ? g.members.length
                      : 0,
                    joined: isJoined(g),
                  }}
                  onJoin={() => handleJoin(g)}
                  onOpen={() => handleOpen(g)}
                />
                {isJoined(g) && (
                  <span className="absolute right-6 top-6 rounded-md bg-green-500/90 px-1 py-1 text-xs font-semibold text-white shadow">
                    Pridruženi
                  </span>
                )}
              </div>
            ))}
        </div>

        {current && (
          <div className="mt-6">
            <GroupChat
              groupId={current.id}
              groupName={current.name}
              canWrite={!!uid}
            />
          </div>
        )}
      </div>
    </main>
  );
}
