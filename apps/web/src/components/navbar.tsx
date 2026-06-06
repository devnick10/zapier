import Link from "next/link"
import { Button } from "./ui/button"
// import { ThemeToggle } from "./ui/theme-toggle"

export const Navbar = () => {
    //TODO  use zustand state management  for User state and auth state 
    return (
        <nav className="w-full max-w-full  px-6 py-4 flex justify-between items-center border-b  dark:border-neutral-700 border-neutral-200">
            <div className="text-2xl">
                <Link href={"/"}>
                    <h1 className="font-bold ">
                        <span className="text-orange-500">
                            _
                        </span>
                        Zapier</h1>
                </Link>
            </div>
            <div className="flex gap-2 text-sm font-medium">
                <Link href={"/login"}>
                    <Button variant={"primary"}>Log in</Button>
                </Link>
                <Link href={"/signup"}>
                    <Button variant={"secondary"}>Sign up</Button>
                </Link>
                {/* <ThemeToggle /> */}
            </div>
        </nav>
    )
}
