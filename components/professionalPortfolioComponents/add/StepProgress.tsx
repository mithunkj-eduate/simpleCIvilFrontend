export const formStepsPortfolio = [
  { id: 0, label: "Meta" },
  { id: 1, label: "Hero" },
  { id: 2, label: "About" },
  { id: 3, label: "Business" },
  { id: 4, label: "Projects" },
  { id: 5, label: "Skills" },
  { id: 6, label: "Certifications" },
  { id: 7, label: "Gallery" },
  { id: 8, label: "Testimonials" },
  { id: 9, label: "FAQ" },
  { id: 10, label: "Contact" },
  { id: 11, label: "Social" },
];

export function StepProgress({ step }: { step: number }) {
  return (
    <div className="w-full px-2 md:px-4 py-4 overflow-x-auto">
      <div className="min-w-[600px] flex items-center justify-between relative">
        {/* Line */}
        <div className="absolute top-3 left-0 right-0 h-1 bg-gray-300" />

        {formStepsPortfolio.map((s, i) => {
          const isCompleted = i < step;
          const isCurrent = i === step;

          return (
            <div key={i} className="flex flex-col items-center flex-1 relative">
              {/* DOT */}
              <div
                className={`z-10 w-6 h-6 rounded-full border-2 transition-all
                ${isCompleted && "bg-green-600 border-green-600"}
                ${isCurrent && "bg-blue-600 border-blue-600 animate-pulse"}
                ${i > step && "bg-gray-300 border-gray-300"}`}
              />

              {/* LABEL */}
              <p
                className={`
                  mt-2 text-[10px] md:text-xs text-center whitespace-nowrap
                  ${isCompleted && "text-green-600"}
                  ${isCurrent && "text-blue-600 font-semibold"}
                  ${i > step && "text-gray-400"}

                  hidden sm:block   // 👈 hide on very small screens
                `}
              >
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* 🔥 Mobile Current Step Label */}
      <div className="text-center mt-3 sm:hidden">
        <p className="text-sm font-semibold text-blue-600">
          {formStepsPortfolio[step]?.label}
        </p>
      </div>
    </div>
  );
}
