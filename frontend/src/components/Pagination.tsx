import { Icon } from "@iconify/react";

const Pagination: React.FC = () => {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  const isMySubscriptions = pathname === "/my-subscriptions";
  const isStatistics = pathname === "/statistics";

  return (
    <div className="flex items-center gap-1 text-neutral-500">
      {isMySubscriptions ? (
        <Icon
          icon="line-md:chevron-left"
          className="text-2xl text-neutral-400"
        />
      ) : (
        <a href="/my-subscriptions" title="My subscriptions">
          <Icon
            icon="line-md:chevron-left"
            className="text-2xl cursor-pointer hover:text-neutral-925 active:text-neutral-925"
          />
        </a>
      )}

      {isStatistics ? (
        <Icon
          icon="line-md:chevron-right"
          className="text-2xl text-neutral-400"
        />
      ) : (
        <a href="/statistics" title="Statistics">
          <Icon
            icon="line-md:chevron-right"
            className="text-2xl cursor-pointer hover:text-neutral-925 active:text-neutral-925"
          />
        </a>
      )}
    </div>
  );
};

export default Pagination;
