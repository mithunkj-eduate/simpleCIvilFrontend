interface SectionHeaderProps {
  label: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export default function SectionHeader({
  label,
  title,
  highlight,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const alignClass =
    align === "center"
      ? "text-center mx-auto"
      : align === "right"
      ? "text-right ml-auto"
      : "text-left";

  // Insert highlight into title - replace last word with highlighted version
  const renderTitle = () => {
    if (!highlight) return <span>{title}</span>;
    const idx = title.indexOf(highlight);
    if (idx === -1) {
      return (
        <>
          {title} <span className="gradient-text">{highlight}</span>
        </>
      );
    }
    return (
      <>
        {title.slice(0, idx)}
        <span className="gradient-text">{highlight}</span>
        {title.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <div className={`mb-12 max-w-2xl ${alignClass}`}>
      <div className="section-label">{label}</div>
      <h2 className="section-title">{renderTitle()}</h2>
      {subtitle && (
        <p
          className="mt-4 text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
