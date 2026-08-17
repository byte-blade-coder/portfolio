import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import AppShell from "../src/components/AppShell";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
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
      <head suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  // Default is light — only go dark if user explicitly saved 'dark'
                  if (savedTheme === 'dark') {
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
      <body suppressHydrationWarning className={bricolage.variable}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

