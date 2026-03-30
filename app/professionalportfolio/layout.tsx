import type { Metadata } from "next";
import "./globalsStyle.css";

export const metadata: Metadata = {
  title: "Portfolio | Professional Landing Page",
  description: "Modern, professional portfolio and landing page.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
      // style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {children}
      </div>
    </>
    // <html lang="en" suppressHydrationWarning>
    //   <head>
    //     <link rel="preconnect" href="https://fonts.googleapis.com" />
    //     <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    //     <link
    //       href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&display=swap"
    //       rel="stylesheet"
    //     />
    //   </head>
    //   <body style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
    //     {children}
    //   </body>
    // </html>
  );
}
