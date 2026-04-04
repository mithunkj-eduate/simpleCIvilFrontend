export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white px-4 py-12">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 text-transparent bg-clip-text">
          How to Create Your Portfolio 🚀
        </h1>
        <p className="text-gray-400 mt-4">
          Follow these simple steps to generate and publish your professional portfolio using AI.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Step 1 */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold text-violet-300 mb-2">
              1️⃣ Copy the Prompt
            </h2>
            <p className="text-gray-300">
              Click the provided prompt and copy it. This prompt is designed to generate your complete portfolio content.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold text-violet-300 mb-2">
              2️⃣ Paste in ChatGPT
            </h2>
            <p className="text-gray-300">
              Open ChatGPT and paste the prompt. If you have a resume or personal details, add them along with the prompt.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold text-violet-300 mb-2">
              3️⃣ Copy AI Response
            </h2>
            <p className="text-gray-300">
              Once ChatGPT generates your portfolio content, copy the full response.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold text-violet-300 mb-2">
              4️⃣ Paste in Input Field
            </h2>
            <p className="text-gray-300">
              Go back to our platform and paste the content into the input field below.
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold text-violet-300 mb-2">
              5️⃣ Click Create Website
            </h2>
            <p className="text-gray-300">
              Click the <span className="text-violet-400 font-medium">Create Website</span> button to generate your portfolio instantly.
            </p>
          </div>
        </div>

        {/* Step 6 */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20">
          <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-semibold text-violet-300 mb-2">
              6️⃣ Publish & Get Your URL
            </h2>
            <p className="text-gray-300">
              After successful creation, click <span className="text-green-400 font-medium">Publish</span>. Your live portfolio URL will be generated instantly 🎉
            </p>
          </div>
        </div>

      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl text-white font-medium hover:opacity-90 transition">
          Start Creating Now 🚀
        </button>
      </div>

    </div>
  );
}