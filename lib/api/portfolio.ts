const BASE_URL_SERVER =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL;

// lib/api/portfolio.ts
export async function getPortfolio(slug: string) {
  try {
    if (BASE_URL_SERVER) {
      const res = await fetch(
        `${BASE_URL_SERVER}/api/professionalPortfolio/${slug}`,
        {
          cache: "no-store", // or "force-cache" for ISR
        },
      );

      // Real HTTP error
      if (!res.ok) {
        return null;
      }

      const data = await res.json();

      // Logical error from backend
      if (!data || data.message) {
        return null;
      }

      return data;

    }
    return;
  } catch (err) {
    console.log(err);
    return null;
  }
}
