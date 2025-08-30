import TileCard from '../ui/TileCard';

export default function Dashboard() {
  return (
    <main className="min-h-[calc(100vh-120px)] bg-blue-50/50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Grid 2x2 na većim ekranima */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Poslednji unos u dnevnik */}
          <TileCard title="Poslednji unos u dnevnik" icon="✍️" tone="pink">
            <blockquote className="rounded-xl bg-white/60 p-4 text-gray-700 shadow-sm">
              “Danas sam se osećala mirno i spokojno dok sam radila…”
            </blockquote>
          </TileCard>

          {/* Trenutno raspoloženje */}
          <TileCard title="Trenutno raspoloženje" icon="😊" tone="blue">
            <div className="flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-3xl font-semibold text-blue-900 shadow">
                7
              </div>
            </div>
          </TileCard>

          {/* Poslednje raspoloženje */}
          <TileCard title="Poslednje raspoloženje" icon="🕒" tone="blue">
            <div className="flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200 text-3xl font-semibold text-blue-900 shadow">
                4
              </div>
            </div>
          </TileCard>

          {/* Zakazani sastanak */}
          <TileCard title="Zakazani sastanak" icon="🗓️" tone="pink">
            <div className="space-y-1 rounded-xl bg-white/60 p-4 text-gray-700 shadow-sm">
              <p className="text-sm text-gray-600">Sastanak sa:</p>
              <p className="font-medium">dr. Jovan Petrović</p>
              <p className="text-sm text-gray-600">15.08.2025. 14:00h</p>
            </div>
          </TileCard>
        </div>
      </div>
    </main>
  );
}
