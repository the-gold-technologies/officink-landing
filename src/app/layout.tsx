import type { Metadata } from "next";
import { Epilogue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
    variable: "--font-epilogue",
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "OFFICINK - Attendance, Salary, Billing & Expenses",
    description: "All-in-One Office Automation Platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${plusJakarta.variable} ${epilogue.variable} antialiased bg-white text-gray-900 font-body`}>
                {children}
            </body>
        </html>
    );
}