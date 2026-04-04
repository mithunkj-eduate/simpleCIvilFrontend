import { data } from "../data/data";

export default function ContactPage() {
  const contact = data.contact;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-4 py-10">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 text-transparent bg-clip-text mb-3">
          {contact.meta.title}
        </h1>

        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          {contact.meta.description}
        </p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">

        {/* Support Email */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 h-full">
            <h2 className="text-lg font-semibold text-violet-300 mb-2">
              📧 Support
            </h2>
            <a
              href={`mailto:${contact.emails.support}`}
              className="text-gray-300 hover:text-violet-400 transition"
            >
              {contact.emails.support}
            </a>
          </div>
        </div>

        {/* General */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 h-full">
            <h2 className="text-lg font-semibold text-violet-300 mb-2">
              💬 General Inquiries
            </h2>
            <a
              href={`mailto:${contact.emails.general}`}
              className="text-gray-300 hover:text-violet-400 transition"
            >
              {contact.emails.general}
            </a>
          </div>
        </div>

        {/* Technical */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 h-full">
            <h2 className="text-lg font-semibold text-violet-300 mb-2">
              🛠 Technical Support
            </h2>
            <a
              href={`mailto:${contact.emails.technical}`}
              className="text-gray-300 hover:text-violet-400 transition"
            >
              {contact.emails.technical}
            </a>
          </div>
        </div>

        {/* Website */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 h-full">
            <h2 className="text-lg font-semibold text-violet-300 mb-2">
              🌐 Website
            </h2>
            <a
              href={contact.website}
              target="_blank"
              className="text-gray-300 hover:text-violet-400 transition"
            >
              {contact.website}
            </a>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-semibold text-violet-300 mb-2">
              We’d love to hear from you 💜
            </h3>
            <p className="text-gray-300 text-sm">
              Reach out anytime — we usually respond within 24 hours.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}