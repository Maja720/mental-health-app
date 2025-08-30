import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function MoodChart({ data }) {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5">
      <div className="h-[360px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" interval="preserveStartEnd" />
            <YAxis allowDecimals={false} domain={[0, 10]} />
            <Tooltip />
            {/* Plava linija (npr. prethodni skor / energija) */}
            <Line
              type="monotone"
              dataKey="alt"
              strokeWidth={2}
              dot
              activeDot={{ r: 5 }}
            />
            {/* Zelena linija (trnutni skor) */}
            <Line
              type="monotone"
              dataKey="mood"
              strokeWidth={2}
              dot
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
