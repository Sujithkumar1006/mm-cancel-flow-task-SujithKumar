"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  onBack?: () => void;
  showBackButton?: boolean;
  currentStep?: number;
  totalSteps?: number;
  disableOutsideClose?: boolean;
  closeAlertText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  onBack,
  showBackButton = false,
  currentStep = 1,
  totalSteps = 1,
  disableOutsideClose = false,
  closeAlertText,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "md:max-w-md",
    md: "md:max-w-lg",
    lg: "md:max-w-2xl",
    xl: "md:max-w-4xl",
    xxl: "md:max-w-5xl",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !disableOutsideClose &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, disableOutsideClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !disableOutsideClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, disableOutsideClose]);

  const handleCloseClick = () => {
    if (closeAlertText) {
      const confirmed = window.confirm(closeAlertText);
      if (!confirmed) return;
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-100 bg-opacity-50 animate-fade-in" />

      <div className="flex min-h-full items-end md:items-center justify-center pb-0 md:pb-4 p-4">
        <div
          ref={modalRef}
          className={`relative ${sizeClasses[size]} w-full bg-white rounded-[20px] mx-0 md:mx-auto overflow-hidden    rounded-b-none md:rounded-[20px] shadow-xl transform animate-slide-in`}
        >
          {title && (
            <div className="flex  md:flex-row md:items-center p-4 border-b border-gray-200 gap-2 md:gap-0">
              <div className="hidden md:flex flex-1 md:justify-start">
                {showBackButton && onBack && (
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

              <div className="flex flex-col md:flex-row md:items-center md:justify-center md:flex-2 flex-1 text-center gap-1 md:gap-4">
                <h3 className="text-sm text-left md:text-base md:text-center font-semibold text-gray-900 mb-1 whitespace-nowrap">
                  {title}
                </h3>
                {totalSteps > 1 && (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {Array.from({ length: totalSteps }, (_, index) => (
                        <div
                          key={index}
                          className={`w-6 h-2 rounded-full transition-colors ${
                            index + 1 < currentStep
                              ? "bg-green-500"
                              : index + 1 === currentStep
                              ? "bg-gray-500"
                              : "bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {currentStep > totalSteps
                        ? "Completed"
                        : `Step ${currentStep} of ${totalSteps}`}
                    </span>
                  </div>
                )}
              </div>

              {/* Close button */}
              <div className="flex flex-1 justify-end">
                <button
                  onClick={handleCloseClick}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="p-3 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
