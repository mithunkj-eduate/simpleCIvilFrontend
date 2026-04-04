import { data } from "../data/data";

export default function HelpCenter() {
  const help = data.helpCenter;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-4 py-10">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 text-transparent bg-clip-text mb-3">
          {help.meta.title}
        </h1>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          {help.meta.description}
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto space-y-6">
        {help.sections.map((sec, index) => (
          <section
            key={index}
            className="relative group p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20"
          >
            <div className="bg-gray-900/80 backdrop-blur-xl p-6 md:p-7 rounded-2xl border border-gray-800 group-hover:border-violet-500/40 transition duration-300">

              {/* Title */}
              <h2 className="text-lg md:text-xl font-semibold text-violet-300 mb-4 flex items-center gap-2">
                <span className="text-violet-500 font-bold">
                  {index + 1}.
                </span>
                {sec.title}
              </h2>

              {/* Content */}
              <ul className="space-y-3 text-gray-300">
                {sec.content.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-violet-400 mb-6 text-center">
          FAQs
        </h2>

        <div className="space-y-4">
          {help.faqs.map((faq, index) => (
            <div
              key={index}
              className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20"
            >
              <div className="bg-gray-900/80 backdrop-blur-xl p-5 rounded-2xl border border-gray-800">

                <h3 className="font-semibold text-violet-300 mb-2">
                  {faq.question}
                </h3>

                <p className="text-gray-300 text-sm">
                  {faq.answer}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}