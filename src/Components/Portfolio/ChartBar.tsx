import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Instrument } from "../../utils/Types";

export function ChartBar({ data }: { data: Instrument[] }) {
  const total = data.reduce((acc, item) => {
    if (item.typeOrder === "Buy") {
      if (acc[item.instrument]) {
        acc[item.instrument] += item.units * item.pricePerUnit;
      } else {
        acc[item.instrument] = item.units * item.pricePerUnit;
      }
    } else {
      if (acc[item.instrument]) {
        acc[item.instrument] -= item.units * item.pricePerUnit;
      } else {
        acc[item.instrument] = -item.units * item.pricePerUnit;
      }
    }
    return acc;
  }, {} as { [key: string]: number });

  // Transform the total object into an array for charting
  const chartData = Object.keys(total).map((key) => ({
    name: key,
    uv: total[key], // use 'uv' to map values to BarChart dataKey
  }));

  const portfolioStatus = (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Portfolio
      </h2>
      <p className="text-gray-600 mb-4">
        You have {data.length} investment items in your portfolio. Just add your
        first instrument.
      </p>
    </div>
  );

  return (
    <div className="my-5">
      {data.length > 0 ? (
        <>
          <h1 className="text-lg mb-3 text-center font-semibold">
            Total Invested per Instrument
          </h1>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={
                  (tick) => `${tick.toLocaleString()}` // Format Y-axis labels with spaces and currency
                }
              />
              <Bar dataKey="uv" fill="#8884d8" />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        portfolioStatus
      )}
    </div>
  );
}
