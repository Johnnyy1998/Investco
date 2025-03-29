import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../utils/format";
import { Instrument } from "../../utils/Types";

export function TotalInvested({ data }: { data: Instrument[] }) {
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
  console.log(chartData);

  return (
    <div className="my-5">
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

      {/*       <h3>Total Invested per Instrument</h3>
      <ul>
        {Object.entries(total).map(([instrument, amount]) => (
          <li key={instrument}>
            {amount >= 0 && `${instrument}: ${formatCurrency(amount)}`}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
