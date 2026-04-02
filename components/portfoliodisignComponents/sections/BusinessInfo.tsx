import { BusinessInfo } from "@/types/portfolio";

interface BusinessInfoProps {
  businessInfo: BusinessInfo;
}

export default function BusinessInfoSection({ businessInfo }: BusinessInfoProps) {
  if (!businessInfo) return null;

  const hasContent =
    businessInfo.ownerName ||
    businessInfo.registrationNumber ||
    businessInfo.gst ||
    businessInfo.established ||
    businessInfo.licenseNumber ||
    (businessInfo.additionalInfo && businessInfo.additionalInfo.length > 0);

  if (!hasContent) return null;

  const fields = [
    { label: "Owner / Director", value: businessInfo.ownerName },
    { label: "Registration No.", value: businessInfo.registrationNumber },
    { label: "GST Number", value: businessInfo.gst },
    { label: "Established", value: businessInfo.established },
    { label: "License No.", value: businessInfo.licenseNumber },
    ...(businessInfo.additionalInfo || []),
  ].filter((f) => f.value);

  return (
    <section id="businessInfo" className="py-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Credentials</span>
          <h2 className="font-serif text-4xl font-bold text-gray-900 mt-2">Business Information</h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {fields.map((field, i) => (
              <div
                key={i}
                className="grid grid-cols-2 px-8 py-5 hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm font-medium text-gray-500">{field.label}</p>
                <p className="text-sm font-semibold text-gray-900">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
