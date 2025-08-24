"use client";

import { useEffect } from "react";
import { VISA_HELP } from "../constant";
import { useCancellationFlowContext } from "../shared/CancellationFlowContext";
import Image from "next/image";

type Contact = {
  name?: string;
  email?: string;
  avatarSrc?: string;
};

export default function VisaPartner() {
  const { jobFoundValue, setModalProps, closeModal } =
    useCancellationFlowContext();

  // Source of truth for whether we show contact card
  const variant = jobFoundValue.step3?.visaHelp;
  const showContact = variant === VISA_HELP.YES;

  // Set final modal title and hide step counter
  useEffect(() => {
    setModalProps({ title: "Subscription Cancelled", showSteps: false });
  }, [setModalProps]);

  const contact: Contact = {
    name: "Mihailo Bozic",
    email: "<mihailo@migratemate.co>",
    avatarSrc: "/images/mihailo-profile.jpeg",
  };

  return (
    <div className="flex-[1.25]">
      <h2 className="text-2xl leading-8 md:text-4xl md:leading-[44px] font-semibold text-gray-800">
        {showContact
          ? "Your cancellation’s all sorted, mate, no more charges."
          : "All done, your cancellation’s been processed."}
      </h2>

      {showContact ? (
        <div className="mt-6">
          <ContactCard
            name={contact.name ?? "Mihailo Basic"}
            email={contact.email ?? "mihailo@migratemate.co"}
            avatarSrc={contact.avatarSrc}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm md:text-xl text-gray-700 font-medium">
          We’re stoked to hear you’ve landed a job and sorted your visa. Big
          congrats from the team! 🎉
        </p>
      )}

      <div className="flex flex-col space-y-3 mt-8 gap-4 pt-5 border-t border-gray-300">
        <button
          type="button"
          onClick={closeModal}
          className="w-full px-4 py-3 rounded-lg text-base font-semibold transition-colors bg-[#8952fc] text-white hover:bg-[#7b40fc]"
        >
          Finish
        </button>
      </div>
    </div>
  );
}

function ContactCard({
  name,
  email,
  avatarSrc,
}: Required<Pick<Contact, "name" | "email">> & {
  avatarSrc?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 md:p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center relative">
          {avatarSrc ? (
            <Image src={avatarSrc} alt={name} priority fill sizes="40px" />
          ) : (
            <span className="text-sm font-semibold text-gray-600">
              {initials(name)}
            </span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-600">{email}</p>
          <div className="mt-4 flex flex-col space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              I’ll be reaching out soon to help with the visa side of things.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              We’ve got your back, whether it’s questions, paperwork, or just
              figuring out your options.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              Keep an eye on your inbox, I’ll be in touch shortly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}
