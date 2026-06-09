"use client"
import { useZap } from "@/hooks/use-zap"
import { Spinner } from "./ui/sipinner"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"

export const ZapTable: React.FC = () => {

    const { loading, zaps } = useZap()

    return (<>
        <div className="py-4">

            {
                loading && <div className="flex items-center justify-center gap-2 text-xl mt-6"> <span>Loading</span> <Spinner className="size-6" /></div>
            }
            <Table className="w-full flex flex-col  ">
                <TableHeader className="w-full ">
                    <TableRow className="flex justify-between w-full max-h-full px-8 ">
                        <TableHead className="font-semibold" >Name</TableHead>
                        <TableHead className="font-semibold" >ID</TableHead>
                        <TableHead className="text-right font-semibold">Go</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                    {
                        zaps.map((z) => (
                            <TableRow key={z.id} className="w-full flex justify-between items-center px-4">
                                <TableCell className="font-medium">{z.action.map(a => a.type.name + " ")}</TableCell>
                                <TableCell>{z.id}</TableCell>
                                <TableCell className="text-right">
                                    <Button className="" variant={"purple"} >GO</Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    </>)
}



