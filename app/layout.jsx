import { Manrope, Poppins } from "next/font/google";
import "./globals.css";
import AppShell from "../src/components/AppShell";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Ahmed Raza | Full Stack Developer & IT Specialist",
  description:
    "Premium portfolio of Ahmed Raza — Full Stack Developer & IT Technician specializing in React, Next.js, WordPress, and modern web experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var dark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (dark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${manrope.variable} ${poppins.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

