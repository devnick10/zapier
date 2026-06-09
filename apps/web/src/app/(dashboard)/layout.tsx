"use client";
import { Navbar } from "@/components/navbar";
import { Spinner } from "@/components/ui/sipinner";
import { api } from "@/lib/axios";
import { useUserStore } from "@/stores/store-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUser, login, isAuthenticated } = useUserStore((state) => state);
  const router = useRouter();
  useEffect(() => {
    api
      .get("/user")
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          login();
        }
      })
      .catch((e) => {
        console.error(e);
        router.push("/");
      });
  }, [router, setUser, login]);

  if (!isAuthenticated) {
    return (
      <div className=" w-full max-w-full h-screen flex items-center justify-center gap-2 text-xl mt-6">
        {" "}
        <span>Loading</span> <Spinner className="size-6" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="">{children}</main>
    </>
  );
}
