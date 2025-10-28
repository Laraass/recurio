import { useEffect, useState } from "react";
import api from "../api/axios";

interface Stats {
  count: number;
  totalSum: number;
}

const TotalSum: React.FC = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchSum = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await api.get(`/users/${userId}/subscriptions/statistics`);
        const stats: Record<string, Stats> = res.data.statistics;

        const totalSum = Object.values(stats).reduce(
          (acc: number, curr: Stats) => acc + curr.totalSum,
          0
        );

        setTotal(totalSum);
      } catch (error) {
        console.error("Failed to fetch total cost,", error);
      }
    };

    fetchSum();
  }, []);

  return (
    <div className="flex flex-col p-6 bg-primary text-neutral-50 gap-2 rounded-xl max-w-md">
      <p className="text-xl font-medium">Total cost this month</p>
      <p className="text-5xl font-semibold">{total} kr</p>
    </div>
  );
};

export default TotalSum;
