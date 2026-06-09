import { Button } from "@/components/ui/button";
import { ZapTable } from "@/components/zap-table";
import Link from "next/link";

export default function page() {
  return (
    <div className="w-full max-w-7xl mx-auto h-vh mt-10">
      <div className="flex justify-between items-baseline px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="text-2xl font-semibold">My Zaps</h3>
        <Link href={"/zap/create"}>
          <Button size={"lg"} variant={"purple"} className="rounded-sm">
            Create
          </Button>
        </Link>
      </div>
      <ZapTable />
    </div>
  );
}
