import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function LandingChart() {
  const DataChart = [
    { dtime: "13 Mar 25", value: 2500 },
    { dtime: "28 Mar 25", value: 350 },
    { dtime: "31 Mar 25", value: 1430 },
    { dtime: "31 Mar 25", value: 14404 },
    { dtime: "31 Mar 25", value: 130 },
    { dtime: "31 Mar 25", value: 390 },
  ];
  return (
    <div className="mt-10">
      {" "}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={DataChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dtime" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LandingChart;
