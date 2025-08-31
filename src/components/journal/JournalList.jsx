import JournalCard from './JournalCard';

const SKELETON_COUNT = 9;
const CARD_HEIGHT_CLASS = 'h-40';

export default function JournalList({ entries = [], loading, onOpen }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <div
                key={i}
                className={`${CARD_HEIGHT_CLASS} animate-pulse rounded-xl bg-white/70 shadow ring-1 ring-black/5`}
                aria-hidden
              />
            ))
          : entries.map((e) => (
              <JournalCard
                key={e.id}
                date={e.date}
                text={e.text}
                onOpen={() => onOpen?.(e)}
              />
            ))}
      </div>
    </div>
  );
}
