import { useMemo, useState } from 'react';
import JournalList from './JournalList';
import JournalEditor from './JournalEditor';

// helper za formatiranje datuma u “dd.mm.yyyy.”
const formatDate = (d = new Date()) =>
  d
    .toLocaleDateString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\./g, '.');

export default function Journal() {
  // demo podaci – lako zameni Firestore-om
  const initial = useMemo(
    () => [
      {
        id: '1',
        date: '24.07.2025.',
        text: 'Danas je bio okej dan, ali sam bila jako umorna od putovanja…',
      },
      {
        id: '2',
        date: '25.07.2025.',
        text: 'Danas je bio lep dan i lepo sam se osećala; završila sam radni dan kako treba i išla na večeru sa prijateljima.',
      },
      {
        id: '3',
        date: '26.07.2025.',
        text: 'Danas je bio okej dan, ali sam bila jako umorna od putovanja…',
      },
      { id: '4', date: '29.07.2025.', text: 'Biće bolje, proći će…' },
      {
        id: '5',
        date: '01.08.2025.',
        text: 'Baš sam bezveze danas ali će proći.',
      },
      {
        id: '6',
        date: '03.08.2025.',
        text: 'Danas je bio okej dan, ali sam bila jako umorna od putovanja…',
      },
      { id: '7', date: '05.08.2025.', text: '' },
      { id: '8', date: '01.09.2025.', text: '' },
    ],
    []
  );

  const [entries, setEntries] = useState(initial);

  const handleSave = async (text) => {
    const newItem = {
      id: crypto.randomUUID(),
      date: formatDate(new Date()),
      text,
    };
    setEntries((prev) => [newItem, ...prev]);
    // ovde kasnije može Firestore:
    // await addDoc(collection(db, 'journal'), newItem)
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50/50">
      <div className="mx-auto max-w-6xl gap-8 px-4 py-10 lg:flex">
        {/* leva kolona: lista unosa */}
        <div className="flex-1">
          <JournalList entries={entries} />
        </div>
        {/* desna kolona: editor */}
        <div className="mt-8 w-full max-w-xl lg:mt-0">
          <JournalEditor onSave={handleSave} />
        </div>
      </div>
    </main>
  );
}
