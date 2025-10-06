import { Icon } from "@iconify/react";

function Logo() {
  return (
    <div className="flex flex-row items-center">
      <span className="text-4xl font-radley">RECURI</span>
      <Icon
        icon="streamline:subscription-cashflow"
        className="text-neutral-950 size-[1.625rem]"
      />
    </div>
  );
}

export default Logo;
