"use client";

import { useCancellationFlowContext } from "../shared/CancellationFlowContext";
import { COMMON_DISCOUNT_AMOUNT } from "../constant";

export default function DownSellOffer() {
  const { monthlyPrice, decideDownsell, goBack } = useCancellationFlowContext();

  const currentPrice = Number(monthlyPrice) || 0;
  const discounted = Math.max(0, currentPrice - COMMON_DISCOUNT_AMOUNT);
  const discountPercent = currentPrice
    ? Math.round((COMMON_DISCOUNT_AMOUNT / currentPrice) * 100)
    : 0;

  return (
    <div className="flex-[1.25]">
      <div className="flex mb-2 md:hidden flex-1 md:justify-start">
        <button
          onClick={goBack}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Go back"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>
      </div>

      <h2 className="text-2xl leading-8 md:text-3xl mb-3 md:leading-[44px] text-gray-800 font-semibold">
        We built this to help you land the job, this makes it a little easier.
      </h2>
      <p className="mt-1 text-sm md:text-2xl text-gray-800">
        We’ve been there and we’re here to help you.
      </p>

      <div className="mt-5 rounded-xl border border-[#8952fc] bg-[#F4EDFF] p-4 md:p-5">
        <h3 className="text-lg md:text-2xl font-semibold text-gray-800 text-center">
          Here’s {discountPercent}% off until you find a job.
        </h3>

        <div className="mt-2 flex items-baseline justify-center gap-3 ">
          <span className="text-xl md:text-2xl font-bold text-[#8952fc] underline">
            ${discounted.toFixed(2)}/month
          </span>
          <span className="text-sm md:text-base text-gray-500 line-through">
            ${currentPrice.toFixed(2)}/month
          </span>
        </div>

        <button
          type="button"
          onClick={() => decideDownsell(true)}
          className="mt-4 w-full rounded-lg bg-green-600 px-4 py-3 text-base font-semibold text-white hover:bg-green-700 transition-colors"
        >
          Get {discountPercent}% offer
        </button>

        <p className="mt-2 text-center text-xs md:text-sm text-gray-500">
          You won’t be charged until your next billing date.
        </p>
      </div>

      <div className="flex flex-col space-y-3 m-5 gap-4 pt-5 border-t border-gray-300">
        <button
          type="button"
          onClick={() => decideDownsell(false)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 transition-colors"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
