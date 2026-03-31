import { BusinessInfo as BusinessInfoType } from "@/lib/types";
import { Building2, CreditCard, User, Calendar, Shield, FileText } from "lucide-react";

interface BusinessInfoProps {
  info: BusinessInfoType;
}

export default function BusinessInfo({ info }: BusinessInfoProps) {
  const fields = [
    { icon: User, label: "Owner / Proprietor", value: info.ownerName },
    info.established && { icon: Calendar, label: "Established", value: info.established },
    info.registrationNumber && {
      icon: FileText,
      label: "Registration Number",
      value: info.registrationNumber,
    },
    info.gst && { icon: CreditCard, label: "GST Number", value: info.gst },
    info.licenseNumber && {
      icon: Shield,
      label: "License Number",
      value: info.licenseNumber,
    },
    ...(info.additionalInfo?.map((item) => ({
      icon: Building2,
      label: item.label,
      value: item.value,
    })) ?? []),
  ].filter(Boolean) as { icon: React.ElementType; label: string; value: string }[];

  return (
    <section
      className="py-12"
      style={{ background: "var(--surface-2)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "var(--accent-light)", color: "var(--accent)" }}
            >
              <Building2 size={20} />
            </div>
            <div>
              <div className="section-label mb-0">Business Information</div>
              <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                Official Registration Details
              </h3>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            { Array.isArray(fields) && fields.map((field, i) => {
              const Icon = field.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg"
                  style={{ background: "var(--surface-3)" }}
                >
                  <Icon size={16} style={{ color: "var(--accent)", marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <div
                      className="text-xs font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {field.label}
                    </div>
                    <div
                      className="text-sm font-semibold mt-0.5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {field.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
