export default function MoodScale({ value, onChange }) {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const tones = [
    'bg-rose-200',
    'bg-rose-300',
    'bg-amber-200',
    'bg-amber-300',
    'bg-yellow-300',
    'bg-green-200',
    'bg-green-300',
    'bg-teal-200',
    'bg-sky-200',
    'bg-sky-300',
  ];

  return (
    <div className="mx-auto flex max-w-3xl items-center justify-center gap-3">
      {items.map((n, i) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={[
            'h-9 w-9 rounded-full text-sm font-semibold shadow ring-1 ring-black/10 transition',
            tones[i],
            value === n ? 'scale-110 ring-2 ring-blue-400' : 'hover:scale-105',
          ].join(' ')}
          aria-label={`Odabrano raspoloženje ${n}`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
