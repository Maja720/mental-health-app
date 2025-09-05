import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function MoodChart({ data = [], loading }) {
  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-4 shadow-lg ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">
          Raspoloženje kroz vreme
        </h3>
        {loading && <span className="text-xs text-gray-500">Učitavam…</span>}
      </div>

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
            <Line
              type="monotone"
              dataKey="alt"
              strokeWidth={2}
              dot
              activeDot={{ r: 5 }}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="mood"
              strokeWidth={2}
              dot
              activeDot={{ r: 5 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default React.memo(MoodChart);
