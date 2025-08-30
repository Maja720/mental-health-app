import JournalCard from './JournalCard';

export default function JournalList({ entries = [] }) {
  return (
    <div className="rounded-2xl bg-blue-100 p-6 shadow-lg ring-1 ring-black/5">
      <div className="mb-5 flex items-center gap-3">
        {/* ikonica knjige */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 text-blue-700"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M4.5 3.75A2.25 2.25 0 0 0 2.25 6v11.25A2.25 2.25 0 0 0 4.5 19.5h.75A3.75 3.75 0 0 1 9 23.25v-18A3.75 3.75 0 0 0 5.25 1.5H4.5a.75.75 0 0 0-.75.75Zm9 0a.75.75 0 0 0-.75.75v18A3.75 3.75 0 0 1 18 19.5h.75A2.25 2.25 0 0 0 21 17.25V6a2.25 2.25 0 0 0-2.25-2.25H18A3.75 3.75 0 0 0 13.5 5.25V4.5a.75.75 0 0 0-.75-.75Z" />
        </svg>
        <h2 className="text-xl font-semibold text-blue-900">Moji unosi</h2>
      </div>

      {/* grid kartica: 3 u redu na md+ */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((e) => (
          <JournalCard key={e.id} date={e.date} text={e.text} />
        ))}
        {/* prazne “placeholder” pločice kao na figmi */}
        <div className="hidden h-20 rounded-xl bg-white/70 shadow ring-1 ring-black/5 sm:block" />
        <div className="hidden h-20 rounded-xl bg-white/70 shadow ring-1 ring-black/5 lg:block" />
      </div>
    </div>
  );
}
