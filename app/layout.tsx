import Header from "@/app/_components/Header";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { LayoutMetaData } from "@/app/_types/LayoutMetaData";
import { ReservationProvider } from "@/app/_components/ReservationContext";
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: LayoutMetaData = {
  title: {
    default: "Wild Oasis",
    template: "%s | Wild Oasis",
  },
  description:
    "Wild Oasis is a luxury cabin rental company, in the heart of the wilderness",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`antialiased flex flex-col ${josefinSans.className} bg-primary-950 text-primary-50 min-h-screen`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
