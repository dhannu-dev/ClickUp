import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TodoProvider } from "../context/TodoContext";
import Navbar from "../Components/section/Navbar";
import HeroSection2 from "../Components/section/HeroSection2";
import { SpaceProvide } from "../context/SpaceContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TodoProvider>
          <SpaceProvide>
            <Navbar />
            <div className="flex w-full h-screen">
              <div className="h-screen overflow-hidden">
                <HeroSection2 />
              </div>
              <div className="w-[1300px] mt-1 border-t border-gray-700 rounded-md h-screen overflow-y-auto no-scrollbar">
                {children}
              </div>
            </div>
          </SpaceProvide>
        </TodoProvider>
      </body>
    </html>
  );
}
