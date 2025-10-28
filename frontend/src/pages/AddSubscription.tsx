import Card from "../components/Card";

const AddSubscription: React.FC = () => {


  return (
    <div className="flex flex-col items-center pt-8 max-w-6xl mx-auto">
      <div className="flex flex-col items-center sm:gap-3 sm:px-6 sm:py-9 sm:w-full sm:border sm:border-neutral-400 sm:shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] sm:rounded-xl">
        <div className="flex flex-col gap-3 w-full max-w-110">
          <h1 className="text-2xl font-semibold">All subscriptions</h1>

          <div className="flex flex-col overflow-auto max-h-[26rem] scrollbar-none rounded-xl border border-neutral-400">
            <Card variant={"Company"} />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubscription;
