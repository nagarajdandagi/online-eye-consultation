import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileConnectWidget from "@/components/dev/MobileConnectWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "OptiCure Eye Health | Expert Ophthalmologist Consultation & Eye Care",
  description:
    "Consult verified ophthalmologists online via HD video or book in-clinic appointments at top eye hospitals. Specialized care for Cataract, LASIK, Retina, Glaucoma, Pediatric Squint, and Dry Eyes.",
  keywords: [
    "ophthalmologist near me",
    "eye doctor online consultation",
    "book eye checkup",
    "cataract surgery",
    "lasik eye surgery cost",
    "retina specialist bangalore",
    "glaucoma doctor",
    "pediatric ophthalmologist"
  ],
  openGraph: {
    title: "OptiCure Eye Health | Advanced Ophthalmology & Telehealth",
    description: "Book verified ophthalmologists for online video and in-clinic consultations across India.",
    type: "website",
    locale: "en_IN",
    siteName: "OptiCure Eye Health"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileConnectWidget />
      </body>
    </html>
  );
}
