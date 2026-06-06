"use client"
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/ui/theme-provider'
import React from 'react'

export const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (<>
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Toaster />
            {children}
        </ThemeProvider>
    </>)
}
