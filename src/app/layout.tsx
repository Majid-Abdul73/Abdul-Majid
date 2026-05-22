import type { Metadata } from "next";
import { Maven_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LayoutWrapper from "@/components/LayoutWrapper";

const mavenPro = Maven_Pro({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const mavenProBody = Maven_Pro({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mavenProMono = Maven_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abdul Majid | Software Engineer & Tech Consultant",
  description:
    "Personal portfolio of a Software Engineer offering consulting, training, mentorship, and freelance development services in web, mobile, and system design.",
  keywords: [
    "software engineer",
    "tech consultant",
    "system design",
    "backend development",
    "frontend development",
    "fullstack developer",
    "mentorship",
    "training",
  ],
  authors: [{ name: "Abdul Majid" }],
  openGraph: {
    title: "Abdul Majid | Software Engineer & Tech Consultant",
    description:
      "Consulting, training, and software development services for individuals and teams.",
    type: "website",
  },
};

import { AuthProvider } from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mavenPro.variable} ${mavenProBody.variable} ${mavenProMono.variable}`} suppressHydrationWarning>
      <body className={`antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
