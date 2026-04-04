import { data } from "../data/data";

export default function TermsOfService() {
  const terms = data.termsOfService;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-4 py-10">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 text-transparent bg-clip-text mb-3">
          {terms.meta.title}
        </h1>

        <p className="text-sm text-gray-400">
          Last Updated: {terms.lastUpdated}
        </p>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          {terms.meta.description}
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto space-y-6">
        {terms.sections.map((sec, index) => (
          <section
            key={index}
            className="relative group p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20"
          >
            {/* Glass Card */}
            <div className="bg-gray-900/80 backdrop-blur-xl p-6 md:p-7 rounded-2xl border border-gray-800 group-hover:border-violet-500/40 transition duration-300">

              {/* Section Title */}
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
                    
                    {/* Custom Bullet */}
                    <span className="mt-1 h-2 w-2 rounded-full bg-violet-500 flex-shrink-0"></span>

                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 text-center">
            
            <h3 className="text-lg font-semibold text-violet-300 mb-2">
              Updates
            </h3>

            <p className="text-gray-300">
              We may update these terms from time to time. Please review them periodically.
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}