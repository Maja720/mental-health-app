export default function TileCard({ title, icon, tone = 'blue', children }) {
  const toneMap = {
    blue: 'bg-blue-100',
    pink: 'bg-pink-100',
  };

  return (
    <div
      className={[
        'rounded-2xl p-6 shadow-md ring-1 ring-black/5 transition hover:shadow-lg',
        toneMap[tone],
      ].join(' ')}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}
