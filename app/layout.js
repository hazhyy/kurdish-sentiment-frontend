import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/ui/ModeToggle";
const rabarFont = localFont({ src: "../public/fonts/Rabar_043.ttf" });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kurdish Sentient",
  description: "Kurdish sentiment analyzer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-black ">
      <body className={rabarFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-row-reverse items-center justify-between h-16 p-4 border-b border-white border-opacity-10">
            <h1 className="text-lg text-right">شیکاری هەست </h1>
            <ModeToggle />
          </div>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
