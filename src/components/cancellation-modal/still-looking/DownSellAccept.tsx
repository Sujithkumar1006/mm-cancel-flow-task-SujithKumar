import { useEffect } from "react";
import { DownSellAcceptProps } from "../shared/types";

const DownSellAccept = ({
  subscriptionEndDate,
  newPrice,
  onMount,
  onCompletion,
}: DownSellAcceptProps) => {
  useEffect(() => {
    onMount();
  }, []);
  const end = new Date(subscriptionEndDate);
  const now = new Date();

  const msLeft = Math.max(0, end.getTime() - now.getTime());
  const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

  const startDate = isNaN(end.getTime())
    ? "—"
    : end.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  const priceStr =
    typeof newPrice === "number" && !Number.isNaN(newPrice)
      ? `$${newPrice.toFixed(2)}`
      : "$—";

  return (
    <div className="flex-[1.25]">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
        Great choice, mate!
      </h2>

      <p className="text-lg md:text-3xl text-gray-800 font-medium mb-2">
        You're still on the path to your dream role.{" "}
        <span className="text-[#8952fc] font-semibold">
          Let’s make it happen together!
        </span>
      </p>

      <p className="mt-4 text-sm md:text-base text-gray-700">
        You’ve got <span className="font-semibold">{daysLeft}</span> days left
        on your current plan. <br />
        <span className="whitespace-nowrap">
          Starting from <span className="font-semibold">{startDate}</span>, your
          monthly payment will be
          <span className="font-semibold"> {priceStr}</span>.
        </span>
      </p>

      <p className="mt-2 text-xs md:text-sm italic text-gray-500">
        You can cancel anytime before then.
      </p>

      <div className="flex flex-col space-y-3 m-5 gap-4 pt-5 border-t border-gray-300">
        <button
          type="button"
          onClick={onCompletion}
          className="w-full px-4 py-3 rounded-lg text-base font-semibold bg-[#8952fc] text-white hover:bg-[#6e3cd6] transition-colors"
        >
          Land your dream role
        </button>
      </div>
    </div>
  );
};

export default DownSellAccept;
