import { useEffect, useState } from "react";
import TotalSum from "../components/TotalSum";
import Card from "../components/Card";
import api from "../api/axios";
import { Icon } from "@iconify/react";

interface Subscription {
  _id: string;
  company: string;
  description?: string;
  price: number;
  image?: string;
}

const Home: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) setName(userName);

    const fetchSubscriptions = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const res = await api.get(`/users/${userId}/subscriptions`);
        setSubscriptions(res.data.subscriptions);
      } catch (error) {
        console.error("Failed to fetch subscriptions", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="flex flex-col items-center pt-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center sm:gap-3 sm:px-6 sm:py-9 sm:w-full sm:border sm:border-neutral-400 sm:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] sm:rounded-xl">
        <div className="flex flex-col gap-3 w-full max-w-110">
          <div className="flex gap-2">
            <h1 className="text-2xl font-semibold">Welcome back,</h1>
            <span className="text-2xl font-semibold">{name || "friend"}!</span>
          </div>

          <TotalSum />

          <div className="flex flex-col overflow-auto max-h-[26rem] scrollbar-none rounded-xl border border-neutral-400">
            {subscriptions.map((subscription) => (
              <Card
                key={subscription._id}
                variant="Sub"
                company={subscription.company}
                description={subscription.description}
                price={subscription.price.toString() + " kr"}
                image={subscription.image}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <a href="/home" title="Add subscription">
              <Icon
                icon="icon-park-solid:add"
                className="text-primary size-10 hover:text-accent active:text-accent"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
