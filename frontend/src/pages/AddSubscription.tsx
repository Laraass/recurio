import { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../api/axios";
import Searchbar from "../components/Searchbar";

interface Subscription {
  _id: string;
  company: string;
  image?: string;
}

const AddSubscription: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const fetchSubscriptions = async (search?: string) => {
    try {
      const url = search ? `/subscriptions?search=${search}` : "/subscriptions";
      const res = await api.get(url);
      setSubscriptions(res.data.subscriptions);
    } catch (error) {
      console.error("Failed to fetch all subscriptions", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="flex flex-col items-center pt-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center sm:gap-3 sm:px-6 sm:py-9 w-full sm:border sm:border-neutral-400 sm:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] sm:rounded-xl">
        <div className="flex flex-col gap-3 w-full max-w-110">
          <h1 className="text-2xl font-semibold">All subscriptions</h1>

          <div>
            <Searchbar onSearch={(value) => fetchSubscriptions(value)} />
          </div>

          <div className="flex flex-col overflow-auto sm:max-h-[40rem] scrollbar-none rounded-xl border border-neutral-400">
            {subscriptions.map((subscription) => (
              <Card
                variant="Company"
                key={subscription._id}
                company={subscription.company}
                image={subscription.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubscription;
