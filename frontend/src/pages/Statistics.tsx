import { useEffect, useState } from "react";
import api from "../api/axios";
import Category from "../components/Category";

interface SubscriptionStats {
  count: number;
  totalSum: number;
}

const Statistics: React.FC = () => {
  const [stats, setStats] = useState<Record<string, SubscriptionStats>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("You must be logged in.");
          return;
        }

        const response = await api.get(
          `/users/${userId}/subscriptions/statistics`
        );
        setStats(response.data.statistics);
      } catch (error) {
        setError("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="text-base">Loading statistics...</p>;
  if (error) return <p className="text-base text-red-600">{error}</p>;

  return (
    <div className="flex flex-col items-center pt-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center sm:gap-3 sm:px-6 sm:py-9 w-full sm:border sm:border-neutral-400 sm:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] sm:rounded-xl">
        <div className="flex flex-col gap-3 w-full max-w-110">
          <h1 className="text-2xl font-semibold">Statistics</h1>

          <div className="flex flex-col gap-1">
            <p>You have ... active subscriptions</p>
            <p>Total ... kr/month</p>
          </div>

          <div className="flex flex-col gap-6 px-6 py-9 border border-neutral-400 rounded-xl">
            <p className="font-bold">Number of subscriptions per category</p>
            {Object.entries(stats).map(([category, data]) => (
              <div
                key={category}
                className="flex items-center justify-between border-b border-neutral-200 pb-3"
              >
                <Category category={category as any} />
                <span className="text-base font-medium">{data.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
