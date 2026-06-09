"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useUserStore } from "@/stores/store-provider";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
// import { ThemeToggle } from "./ui/theme-toggle"

export const Navbar = () => {
  const { user, logout } = useUserStore((state) => state);
  const router = useRouter();
  return (
    <nav className="w-full max-w-full  px-6 py-4 flex justify-between items-center border-b  dark:border-neutral-700 border-neutral-200">
      <div className="text-2xl">
        <Link href={"/"}>
          <h1 className="font-bold ">
            <span className="text-orange-500">_</span>
            Zapier
          </h1>
        </Link>
      </div>
      {!user && (
        <div className="flex gap-2 text-sm font-medium">
          <Link href={"/login"}>
            <Button variant={"primary"}>Log in</Button>
          </Link>
          <Link href={"/signup"}>
            <Button variant={"secondary"}>Sign up</Button>
          </Link>
          {/* <ThemeToggle /> */}
        </div>
      )}
      {user && (
        <div className="flex gap-4 text-sm font-medium items-center">
          <div className="flex items-baseline text-xl gap-2 font-thin">
            <UserIcon />
            {user.name}
          </div>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              logout();
              router.push("/");
            }}
            variant={"secondary"}
            className="rounded-sm py-1 px-4"
          >
            Log out
          </Button>
        </div>
      )}
    </nav>
  );
};
