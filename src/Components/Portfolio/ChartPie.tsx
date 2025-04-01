import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { StockData } from "../../utils/Types";

function ChartPie({ data }: { data: StockData[] }) {
  const filteredData = data
    .filter((item) => item.price !== null)
    .map((item) => ({
      name: item.instrument,
      value: Math.round(item.totalshares * (item.price || 0)),
    }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const renderLabel = ({ name, percent }: any) => {
    return `${name}  ${Math.round(percent * 100)}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={600} className="hidden md:block">
      <PieChart>
        <Pie
          data={filteredData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={200}
          label={renderLabel}
          labelLine={true} // zobrazí čáru mezi výsečí a popiskem
        >
          {filteredData.map((_, index) => (
            <Cell key={`cell ${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default ChartPie;
