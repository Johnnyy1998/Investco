import { Instrument } from "../../utils/Types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns"; // importujte funkcionalitu pro formátování dat

function ChartLine({ data }: { data: Instrument[] }) {
  const chartData = data
    .map((item) => ({
      dtime: format(new Date(item.created_at), "dd MMM yy"),
      value:
        item.typeOrder === "Buy"
          ? item.units * item.pricePerUnit // Hodnota pro Y osu
          : -item.units * item.pricePerUnit,
    }))
    .slice(0, 10);
  console.log(chartData);
  return (
    <div className="mt-10">
      {chartData.length > 0 && (
        <>
          <h1 className="text-lg mb-3 text-center font-semibold">
            Chart showing historical orders amount in $
          </h1>{" "}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dtime" />
              <YAxis
                tickFormatter={
                  (tick) => `${tick.toLocaleString()}` // Format Y-axis labels with spaces and currency
                }
              />
              <Tooltip />

              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default ChartLine;
