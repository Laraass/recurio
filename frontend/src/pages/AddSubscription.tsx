import { useEffect, useState } from "react";
import Card from "../components/Card";
import api from "../api/axios";
import Searchbar from "../components/Searchbar";
import Modal from "../components/Modal";

interface Subscription {
  _id: string;
  company: string;
  image?: string;
}

const AddSubscription: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [modalVariant, setModalVariant] = useState<"AddSub" | "Confirm">(
    "AddSub"
  );
  const [confirmMessage, setConfirmMessage] = useState("");

  const fetchSubscriptions = async (search?: string) => {
    try {
      const url = search ? `/subscriptions?search=${search}` : "/subscriptions";
      const res = await api.get(url);
      setSubscriptions(res.data.subscriptions);
    } catch (error) {
      console.error("Failed to fetch all subscriptions", error);
    }
  };

  const openModal = (subscription: Subscription) => {
    setSelectedSub(subscription);
    setModalOpen(true);
  };

  const addSubscription = async (data: {
    description: string;
    price: string;
  }) => {
    if (!selectedSub) return;

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("You must be logged in.");
        return;
      }

      await api.post(`/users/${userId}/subscriptions`, {
        company: selectedSub.company,
        description: data.description,
        price: data.price,
      });

      fetchSubscriptions();
      setModalOpen(false);
    } catch (error: any) {
      if (error.response?.status === 400) {
        setModalOpen(true);
        setModalVariant("Confirm");
        setConfirmMessage("You already have this subscription.");
      }
      console.error("Failed to add subscription", error);
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
                onAdd={() => openModal(subscription)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedSub && (
        <Modal
          variant={modalVariant}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setModalVariant("AddSub");
          }}
          company={selectedSub.company}
          image={selectedSub.image}
          onSubmit={addSubscription}
          confirmMessage={confirmMessage}
        />
      )}
    </div>
  );
};

export default AddSubscription;
