import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Next Step",
  description: "Ахлах ангийн сурагчдад зориулсан платформ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
