import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PieChartWheelProps {
  stats: Record<string, { totalSum: number }>;
}

const categoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Entertainment: "#ef4444",
    Music: "#a855f7",
    Fitness: "#10b981",
    Cloud: "#0ea5e9",
    Shopping: "#f97316",
    News: "#facc15",
    Productivity: "#6b7280",
  };
  return colors[category];
};

const PieChartWheel: React.FC<PieChartWheelProps> = ({ stats }) => {
  const data = Object.entries(stats).map(([category, data]) => ({
    name: category,
    value: data.totalSum,
  }));

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={categoryColor(entry.name)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartWheel;
