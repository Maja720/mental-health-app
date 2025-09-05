import { useMemo, useState, useCallback, useEffect } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  limit as fbLimit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../contexts/AuthContext';
import { useQueryRT } from '../../hooks/useQuery';

import JournalList from './JournalList';
import JournalEditor from './JournalEditor';
import JournalModal from './JournalModal';
import PrevNext from './PrevNext';

const STEP_SIZE = 9;

function formatDate(d = new Date()) {
  return d
    .toLocaleDateString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\./g, '.');
}

export default function Journal() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const baseQ = useMemo(() => {
    if (!uid) return null;
    return query(
      collection(db, 'users', uid, 'journalEntries'),
      orderBy('createdAt', 'desc'),
      fbLimit(STEP_SIZE)
    );
  }, [uid]);

  const { docs: firstDocs = [], loading: firstLoading } = useQueryRT(baseQ);

  const [pages, setPages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [idx, setIdx] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const firstPage = useMemo(() => {
    return firstDocs.map((d) => {
      const ts = d.createdAt;
      const dt = ts?.toDate ? ts.toDate() : ts || null;
      return {
        id: d.id,
        text: d.text || '',
        date: dt ? formatDate(dt) : '',
        _createdAt: dt,
      };
    });
  }, [firstDocs]);

  useEffect(() => {
    if (firstLoading) return;
    const p0 = {
      items: firstPage,
      cursor: firstPage[firstPage.length - 1]?._createdAt || null,
    };
    setPages([p0]);
    setIdx(0);
    setHasMore(firstPage.length === STEP_SIZE);
  }, [firstLoading, firstPage]);

  const fetchNextPage = useCallback(async () => {
    if (!uid) return null;
    const lastPage = pages[pages.length - 1];
    const after = lastPage?.cursor || null;

    const qMore = query(
      collection(db, 'users', uid, 'journalEntries'),
      orderBy('createdAt', 'desc'),
      ...(after ? [startAfter(after)] : []),
      fbLimit(STEP_SIZE)
    );
    const snap = await getDocs(qMore);
    const items = snap.docs.map((docSnap) => {
      const data = docSnap.data();
      const ts = data.createdAt;
      const dt = ts?.toDate ? ts.toDate() : ts || null;
      return {
        id: docSnap.id,
        text: data.text || '',
        date: dt ? formatDate(dt) : '',
        _createdAt: dt,
      };
    });
    return {
      items,
      cursor: items[items.length - 1]?._createdAt || null,
      hasMore: items.length === STEP_SIZE,
    };
  }, [uid, pages]);

  const goNext = useCallback(async () => {
    const nextIndex = idx + 1;
    if (nextIndex < pages.length) {
      setIdx(nextIndex);
      return;
    }
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      const next = await fetchNextPage();
      if (!next) return;
      setPages((prev) => [...prev, { items: next.items, cursor: next.cursor }]);
      setHasMore(next.hasMore);
      setIdx((i) => i + 1);
    } finally {
      setLoadingMore(false);
    }
  }, [idx, pages.length, hasMore, loadingMore, fetchNextPage]);

  const goPrev = useCallback(() => {
    setIdx((i) => Math.max(0, i - 1));
  }, []);

  const entries = pages[idx]?.items || [];

  const [saving, setSaving] = useState(false);
  const handleSave = async (text) => {
    const clean = (text || '').trim();
    if (!uid || !clean) return;
    setSaving(true);
    try {
      await addDoc(collection(db, 'users', uid, 'journalEntries'), {
        text: clean,
        createdAt: serverTimestamp(),
      });
      setIdx(0);
    } finally {
      setSaving(false);
    }
  };

  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const prevDisabled = idx === 0;
  const nextDisabled = idx >= pages.length - 1 && !hasMore;

  return (
    <main className=" bg-blue-50/50">
      <div className="mx-auto max-w-6xl gap-8 px-4 py-6 lg:flex">
        <div className="flex-1">
          <div className="rounded-2xl bg-blue-100 p-6 shadow-lg ring-1 ring-black/5">
            <div className="mb-5 flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-blue-700"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4.5 3.75A2.25 2.25 0 0 0 2.25 6v11.25A2.25 2.25 0 0 0 4.5 19.5h.75A3.75 3.75 0 0 1 9 23.25v-18A3.75 3.75 0 0 0 5.25 1.5H4.5a.75.75 0 0 0-.75.75Zm9 0a.75.75 0 0 0-.75.75v18A3.75 3.75 0 0 1 18 19.5h.75A2.25 2.25 0 0 0 21 17.25V6a2.25 2.25 0 0 0-2.25-2.25H18A3.75 3.75 0 0 0 13.5 5.25V4.5a.75.75 0 0 0-.75-.75Z" />
              </svg>
              <h2 className="text-xl font-semibold text-blue-900">
                Moji unosi
              </h2>
            </div>

            <JournalList
              entries={entries}
              loading={firstLoading && pages.length === 0}
              onOpen={setSelected}
            />

            <PrevNext
              onPrev={goPrev}
              onNext={goNext}
              prevDisabled={prevDisabled}
              nextDisabled={nextDisabled || loadingMore}
              loadingMore={loadingMore}
            />
          </div>
        </div>

        <div className="mt-6 w-full max-w-xl lg:mt-0">
          <JournalEditor onSave={handleSave} saving={saving} />
        </div>
      </div>

      <JournalModal
        open={!!selected}
        onClose={closeModal}
        date={selected?.date}
        text={selected?.text}
      />
    </main>
  );
}
