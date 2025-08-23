"use client";
import { FoundThrough } from "../types";

type Step3Value = {
  visaHelp: "yes" | "no" | "";
  visaType: string;
};

type Step3Props = {
  source: FoundThrough;
  value: Step3Value;
  onChange: (field: keyof Step3Value, val: string) => void;
  onNext?: () => void;
  onBack?: () => void;
};

const COPY: Record<
  string,
  {
    title: string;
    subtitle: string;
    askYesNo: boolean;
    yesSubQuestion: string;
    noSubQuestion: string;
    additionalTitle?: string;
  }
> = {
  Yes: {
    title: "We helped you land the job, now let’s help you secure your visa.",
    subtitle:
      "Is your company providing an immigration lawyer to help with your visa?",
    askYesNo: true,
    yesSubQuestion: "What visa will you be applying for?",
    noSubQuestion:
      "We can connect you with one of our trusted partners.\nWhich visa would you like to apply for?",
  },
  No: {
    title: "You landed the job!\nThat’s what we live for.",
    additionalTitle:
      "Even if it wasn’t through Migrate Mate,\nlet us help get your visa sorted.",
    subtitle:
      "Is your company providing an immigration lawyer to help with your visa?",
    askYesNo: true,
    yesSubQuestion: "What visa will you be applying for?",
    noSubQuestion:
      "We can connect you with one of our trusted partners.\nWhich visa would you like to apply for?",
  },
};

export default function Step3({
  value,
  onChange,
  onNext,
  onBack,
  source,
}: Step3Props) {
  const {
    title,
    subtitle,
    askYesNo,
    yesSubQuestion,
    noSubQuestion,
    additionalTitle = "",
  } = COPY[source];

  const answer = value.visaHelp;
  const visaType = value.visaType;

  const showVisaInput = source === "no" || answer === "yes";
  const isValid =
    (askYesNo ? !!answer : true) && showVisaInput
      ? visaType.trim().length > 0
      : !!answer;

  return (
    <div className="flex-[1.25]">
      <div className="flex mb-2 md:hidden flex-1 md:justify-start">
        {onBack && (
          <button
            onClick={onBack}
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
        )}
      </div>
      <h2 className="text-2xl leading-8 md:text-4xl md:leading-[44px] font-semibold text-gray-800 whitespace-pre-line">
        {title}
      </h2>

      {additionalTitle && (
        <h2 className="text-xl text-gray-700 whitespace-pre-line mt-3 mb-4 font-medium">
          {additionalTitle}
        </h2>
      )}
      <p className="mt-4 text-sm md:text-base text-gray-700">{subtitle}</p>

      {askYesNo && (
        <div className="mt-6 space-y-4">
          {!answer ? (
            <>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="visa-help"
                  value="yes"
                  checked={answer ? answer === "yes" : false}
                  onChange={() => onChange("visaHelp", "yes")}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-gray-500"
                />
                <span className="text-base text-gray-800">Yes</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="visa-help"
                  value="no"
                  checked={answer ? answer === "no" : false}
                  onChange={() => onChange("visaHelp", "no")}
                  className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-gray-500"
                />
                <span className="text-base text-gray-800">No</span>
              </label>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-block h-5 w-5 rounded-full border-2 border-gray-600 relative">
                  <span className="absolute inset-1 rounded-full bg-gray-600" />
                </span>
                <span className="text-base text-gray-900 font-medium capitalize">
                  {answer}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onChange("visaHelp", "")}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Change
              </button>
            </div>
          )}
        </div>
      )}

      {answer && (
        <div className="mt-2">
          <label
            htmlFor="visa-type"
            className="block text-sm font-medium text-gray-700 mb-1 whitespace-pre-line"
          >
            {answer === "yes" ? yesSubQuestion : noSubQuestion}
            <span className="text-red-500">*</span>
          </label>
          <input
            id="visa-type"
            type="text"
            value={visaType}
            onChange={(e) => onChange("visaType", e.target.value)}
            placeholder="Enter visa type…"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm md:text-base outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="flex flex-col space-y-3 mt-8 gap-4 pt-5 border-t border-gray-300">
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className={`
              w-full px-4 py-3 rounded-lg text-base font-semibold transition-colors
              ${
                isValid
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
