import { Icon } from "@iconify/react";
import Card from "../components/Card";
import Searchbar from "../components/Searchbar";
import { useEffect, useState } from "react";
import api from "../api/axios";

interface Subscription {
  _id: string;
  company: string;
  description?: string;
  price?: string;
  image?: string;
}

const MySubscriptios: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  const fetchUserSubscriptions = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await api.get(`/users/${userId}/subscriptions`);
      setSubscriptions(res.data.subscriptions);
    } catch (error) {
      console.error("Failted to fetch user subscriptions", error);
    }
  };

  useEffect(() => {
    fetchUserSubscriptions();
  });

  return (
    <div className="flex flex-col items-center pt-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center sm:gap-3 sm:px-6 sm:py-9 w-full sm:border sm:border-neutral-400 sm:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] sm:rounded-xl">
        <div className="flex flex-col gap-3 w-full max-w-110">
          <h1 className="text-2xl font-semibold">My subscriptions</h1>

          <div>
            <Searchbar />
          </div>

          <div className="flex flex-col overflow-auto sm:max-h-[35rem] scrollbar-none rounded-xl border border-neutral-400">
            {subscriptions.map((sub) => (
              <Card
                key={sub._id}
                variant="MySub"
                company={sub.company}
                description={sub.description}
                price={sub.price}
                image={sub.image}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <a href="/subscriptions" title="Add subscription">
            <Icon
              icon="icon-park-solid:add"
              className="text-primary size-10 hover:text-accent active:text-accent"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MySubscriptios;
