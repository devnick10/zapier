import { Navbar } from "@/components/navbar";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="max-w-7xl mx-auto h-vh">
                {children}
            </main>
        </>
    )
}
