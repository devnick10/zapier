"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { FormEvent, useState } from "react"
import { User } from "@/lib/types"
import { toast } from "sonner"
import axios from "axios"
import { api } from "@/lib/axios"
import { Spinner } from "./ui/sipinner"
import { useRouter } from "next/navigation"

export const SignupForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        password: ""
    })
    const router = useRouter()

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // TODO implement zod validation
        if (!user.email || !user.name && !user.password) {
            toast.error("Please verify all details something wrong!")
            return;
        }
        setLoading(true);
        try {
            const response = await api.post("/user/signup", user)
            if (!response.data.token) {
                toast.error("Something went wrong")
                return;
            } else if (response.status === 201) {
                toast.success("Signup successfully.")
                localStorage.setItem("token", String(response.data.token))
                router.push("/dashboard")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return <div className='flex flex-col items-center gap-4 '>
        <div className="border border-neutral-200 dark:border-neutral-500 px-4 py-6 rounded-sm  w-full">
            <h1 className='font-semibold text-xl text-center mb-6'>Create an account</h1>
            <form className='flex flex-col gap-4 w-full ' onSubmit={submit}>
                <Input
                    value={user.name}
                    onChange={(e) => (setUser((p) => ({ ...p, name: e.target.value })))}
                    type="text"
                    required
                    placeholder='Name' />
                <Input
                    value={user.email}
                    onChange={(e) => (setUser((p) => ({ ...p, email: e.target.value })))}
                    type="email"
                    required
                    placeholder='Email' />
                <Input
                    value={user.password}
                    onChange={(e) => (setUser((p) => ({ ...p, password: e.target.value })))}
                    type="password"
                    required
                    placeholder='Password' />
                <Button variant={"secondary"} disabled={loading} className='rounded-sm' type="submit">
                    Sign up {loading && <Spinner />}
                </Button>
                <p className="text-center">Already have an account? <Link className="underline" href={"/login"}>Log In</Link></p>
            </form>
        </div>
    </div>

}
