import { useMemo, useState } from 'react';
import GroupCard from './GroupCard';

const seed = [
  {
    id: 'g1',
    name: 'Podrška osobama sa anksioznošću',
    members: 154,
    desc: 'Siguran prostor za deljenje iskustava i saveta u borbi sa izazovima anksioznosti.',
  },
  {
    id: 'g2',
    name: 'Mentalno zdravlje studenata',
    members: 231,
    desc: 'Mesto gde studenti dele stres, pritiske i izazove akademskog života.',
  },
  {
    id: 'g3',
    name: 'Podrška za osobe u procesu tugovanja',
    members: 89,
    desc: 'Zajednica koja pruža prostor za deljenje emocija i iskustava posle gubitka.',
  },
  {
    id: 'g4',
    name: 'Zajednica za depresiju i samopomoć',
    members: 310,
    desc: 'Otvoren razgovor o depresiji, tehnikama prevazilaženja i međusobnoj podršci.',
  },
  {
    id: 'g5',
    name: 'Podrška za roditelje dece sa mentalnim poteškoćama',
    members: 67,
    desc: 'Razmena iskustava i utehe među roditeljima koji se svakodnevno bore za dobrobit dece.',
  },
  {
    id: 'g6',
    name: 'Podrška za osobe sa problemima spavanja',
    members: 125,
    desc: 'Za one koji se bore sa nesanicom, poremećajem sna ili stresom koji utiče na odmor.',
  },
];

export default function Groups() {
  const [query, setQuery] = useState('');
  const [joined, setJoined] = useState({}); // {groupId: true}

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seed;
    return seed.filter(
      (g) =>
        g.name.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)
    );
  }, [query]);

  const onJoin = (g) => {
    // ovde posle može Firestore upis (memberships)
    setJoined((prev) => ({ ...prev, [g.id]: true }));
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50/50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Heder sa ikonicom + naslov */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* ikonica grupe */}
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

          {/* pretraga */}
          <div className="relative w-72 max-w-[60vw]">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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

        {/* grid kartica */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <div key={g.id} className="relative">
              <GroupCard item={g} onJoin={onJoin} />
              {joined[g.id] && (
                <span className="absolute right-6 top-6 rounded-full bg-green-500/90 px-3 py-0.5 text-xs font-semibold text-white shadow">
                  Pridruženi
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
