export default function PrevNext({
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
  loadingMore,
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        onClick={onPrev}
        disabled={prevDisabled}
        className="rounded-lg bg-white px-3 py-1 text-sm text-blue-700 ring-1 ring-blue-200 hover:bg-blue-50 disabled:opacity-50"
      >
        ← Prethodna
      </button>

      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="rounded-lg bg-white px-3 py-1 text-sm text-blue-700 ring-1 ring-blue-200 hover:bg-blue-50 disabled:opacity-50"
      >
        {loadingMore ? 'Učitavam…' : 'Sledeća →'}
      </button>
    </div>
  );
}
