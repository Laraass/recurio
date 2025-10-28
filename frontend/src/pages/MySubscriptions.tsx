import { Icon } from "@iconify/react";
import Card from "../components/Card";
import Searchbar from "../components/Searchbar";
import { useEffect, useState } from "react";
import api from "../api/axios";
import TotalSum from "../components/TotalSum";
import Modal from "../components/Modal";

interface Subscription {
  _id: string;
  company: string;
  description?: string;
  price?: string;
  image?: string;
}

const MySubscriptios: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<"AddSub" | "EditSub" | "Confirm">("AddSub");
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [confirmAction, setConfirmAction] = useState<() => void>();
  const [confirmMessage, setConfirmMessage] = useState("");

  const fetchUserSubscriptions = async (search?: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const url = search
        ? `/users/${userId}/subscriptions?search=${search}`
        : `/users/${userId}/subscriptions`;

      const res = await api.get(url);
      setSubscriptions(res.data.subscriptions);
    } catch (error) {
      console.error("Failted to fetch user subscriptions", error);
    }
  };

  const editClick = (sub: Subscription) => {
    setSelectedSub(sub);
    setModalVariant("EditSub");
    setModalOpen(true);
  };

  const deleteClick = (sub: Subscription) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    setSelectedSub(sub);
    setConfirmMessage(`Are you sure you want to delete ${sub.company}?`);
    setModalVariant("Confirm");
    setModalOpen(true);

    setConfirmAction(() => async () => {
      try {
        await api.delete(`/users/${userId}/subscriptions/${sub._id}`);
        fetchUserSubscriptions();
        setModalOpen(false);
      } catch (error) {
        console.error("Failed to delete subscription", error);
      }
    });
  };

  useEffect(() => {
    fetchUserSubscriptions();
  }, []);

  return (
    <div className="flex flex-col items-center pt-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center sm:gap-3 sm:px-6 sm:py-9 w-full sm:border sm:border-neutral-400 sm:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] sm:rounded-xl">
        <div className="flex flex-col gap-3 w-full max-w-110">
          <h1 className="text-2xl font-semibold">My subscriptions</h1>
          <TotalSum />
          <div>
            <Searchbar onSearch={(value) => fetchUserSubscriptions(value)} />
          </div>

          <div className="flex flex-col overflow-auto sm:max-h-[24rem] scrollbar-none rounded-xl border border-neutral-400">
            {subscriptions.map((sub) => (
              <Card
                key={sub._id}
                variant="MySub"
                company={sub.company}
                description={sub.description}
                price={sub.price}
                image={sub.image}
                onEdit={() => editClick(sub)}
                onDelete={() => deleteClick(sub)}
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

      {selectedSub && (
        <Modal
          variant={modalVariant}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          confirmAction={confirmAction}
          confirmMessage={confirmMessage}
          company={selectedSub.company}
          image={selectedSub.image}
          defaultValue={{
            description: selectedSub?.description,
            price: selectedSub?.price,
          }}
          onSubmit={async (data) => {
            if (!selectedSub) return;
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            try {
              await api.patch(
                `/users/${userId}/subscriptions/${selectedSub._id}`,
                {
                  description: data.description,
                  price: Number(data.price),
                }
              );
              fetchUserSubscriptions();
              setModalOpen(false);
            } catch (error) {
              console.error("Failed to edit subscription", error);
            }
          }}
        />
      )}
    </div>
  );
};

export default MySubscriptios;
