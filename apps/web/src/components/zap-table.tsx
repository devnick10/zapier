"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useZap } from "@/hooks/use-zap";
import { Button } from "./ui/button";
import { Spinner } from "./ui/sipinner";
import Link from "next/link";
import { HOOKS_URL } from "@/lib/config";
import { useUserStore } from "@/stores/store-provider";
import { toast } from "sonner";

export const ZapTable: React.FC = () => {
  const { loading, zaps } = useZap();
  const { user } = useUserStore(state => state)
  return (
    <>
      <div className="py-4">
        {loading && (
          <div className="flex items-center justify-center gap-2 text-xl mt-6">
            {" "}
            <span>Loading</span> <Spinner className="size-6" />
          </div>
        )}
        <Table className="">
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Webhook URL</TableHead>
              <TableHead className="text-right font-semibold pr-6">Go</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {zaps.map((z) => (
              <TableRow
                key={z.id}
                className=""
              >

                <TableCell className="font-medium ">
                  {z.action.map((a) => (
                    <div key={a.id} className="flex gap-2 ">
                      <img src={z.trigger.type.image} className="w-8 h-8 object-contain" />
                      <img src={a.type.image} className="w-8 h-8 object-contain" />
                    </div>
                  ))}
                </TableCell>
                <TableCell>{z.id}</TableCell>
                <TableCell className="max-w-xs truncate" >
                  <div className="flex items-center gap-2">
                    <span className="max-w-75 truncate">
                      {`${HOOKS_URL}/catch/${user?.id}/${z.id}`}
                    </span>

                    <Button
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${HOOKS_URL}/catch/${user?.id}/${z.id}`
                        )
                        toast.success("Webhook URL copied")
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/zap/${z.id}`}>
                    <Button className="" variant={"purple"} >
                      Go
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
