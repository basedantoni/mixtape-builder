import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import Providers from "@/app/providers";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const brick = localFont({
  src: "./fonts/Brick.woff",
  variable: "--font-brick",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mixtape Builder",
  description:
    "Build a mixtape for your friends, loved ones, or significat other.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brick.variable} antialiased flex flex-col items-center w-full h-full min-h-dvh bg-white dark:bg-zinc-900`}
      >
        <div className="flex flex-col container h-full px-4 py-6 text-black dark:text-zinc-50">
          <Providers>{children}</Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
