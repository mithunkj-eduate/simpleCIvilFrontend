export const isValidSeasonName = (value: string) => {
  return /^(Kharif|Rabi|Summer)\s\d{4}(-\d{2})?$/.test(value.trim());
};

export const formatSeasonInput = (value: string) => {
  if (!value) return value;

  const text = value.trim().toLowerCase();

  const match = text.match(/(kharif|rabi|summer)\s*-?\s*(\d{4})/i);

  if (!match) return value;

  const season =
    match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();

  const year = parseInt(match[2]);

  // Rabi spans two years
  if (season === "Rabi") {
    const nextYear = (year + 1).toString().slice(-2);
    return `Rabi ${year}-${nextYear}`;
  }

  return `${season} ${year}`;
};