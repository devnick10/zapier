"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { User } from "@/lib/types";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { Spinner } from "./ui/sipinner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/store-provider";

type LoginCredentials = Omit<User, "name">;

export const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login } = useUserStore((state) => state);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO implement zod validation
    if (!user.email || !user.password) {
      toast.error("Please verify all details something wrong!");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/user/signin", user);
      if (!response.data.token) {
        toast.error("Something went wrong");
      } else if (response.status === 200) {
        toast.success("Signup successfully.");
        localStorage.setItem("token", String(response.data.token));
        login();
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 border border-neutral-200 dark:border-neutral-500 px-4 py-6">
      <h1 className="font-semibold text-xl text-center">
        Log in to your account{" "}
      </h1>
      <form className="flex flex-col gap-4 w-full " onSubmit={submit}>
        <Input
          value={user.email}
          onChange={(e) => setUser((p) => ({ ...p, email: e.target.value }))}
          type="email"
          required
          placeholder="Email"
        />
        <Input
          value={user.password}
          onChange={(e) => setUser((p) => ({ ...p, password: e.target.value }))}
          type="password"
          required
          placeholder="Password"
        />
        <Button variant={"secondary"} className="rounded-sm">
          Log in {loading && <Spinner />}
        </Button>
        <p className="text-center">
          {" "}
          Don&apos;t have a Zapier account yet?{" "}
          <Link className="underline" href={"/signup"}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};
