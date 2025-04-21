import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getInvestedPerInstrument } from "../../utils/Actions/InstrumentActions";
import { memo } from "react";

function ChartBar() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["TotalInvested"],
    queryFn: getInvestedPerInstrument,
    staleTime: 5 * 60 * 1000,
  });
  console.log("rendering chartBar");
  if (isPending) {
    return <span>Loading ..</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

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
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="instrument" />
              <YAxis
                tickFormatter={
                  (tick) => `${tick.toLocaleString()}` // Format Y-axis labels with spaces and currency
                }
              />
              <Bar dataKey="investedperinstrument" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-wrap">
            The chart shows how much you have invested in each instrument. The
            value can be negative if you sold the instrument at a higher price
            than you bought it. Once you have sold all the securities of a given
            instrument, the chart will not show the instrument
          </p>
        </>
      ) : (
        portfolioStatus
      )}
    </div>
  );
}

export default memo(ChartBar);
