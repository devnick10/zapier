"use client";
import { Navbar } from "@/components/navbar";
import { PageLoader } from "@/components/page-loader";
import { api } from "@/lib/axios";
import { useUserStore } from "@/stores/store-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicRoutes({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUser, login, isAuthenticated } = useUserStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    api.get("/user").then((res) => {
      if (res.data.user) {
        setUser(res.data.user);
        login();
        router.push("/dashboard");
      }
    });
  }, [router, setUser, login]);

  if (isAuthenticated) {
    return <PageLoader />;
  }

  return (
    <>
      <Navbar />
      <main className="">{children}</main>
    </>
  );
}
