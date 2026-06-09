"use client"
import { api } from "@/lib/axios"
import { Zap } from "@/lib/types"
import { useEffect, useState } from "react"

export const useZap = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [zaps, setZaps] = useState<Zap[]>([])

    useEffect(() => {
        setLoading(true);
        api.get("/zap").then((res) => {
            setZaps(res.data.zaps)
        }).finally(() => { setLoading(false) })
    }, [])

    return { zaps, loading }
}
