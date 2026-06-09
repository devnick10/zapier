import { LoginForm } from '@/components/login-form';
import { Button } from '@/components/ui/button';
import React from 'react';

const Page: React.FC = () => {
    return (
        <div className='w-full max-w-5xl mx-auto min-h-[calc(100vh-64px)] flex gap-2 items-center justify-center '>
            <div className='bg-neutral-200 dark:bg-neutral-700 w-1/2 flex flex-col gap-4 items-start   rounded-sm px-4 py-12'>
                <h2 className='text-2xl'>Automate across your teams</h2>
                <p>Zapier Enterprise empowers everyone in your business to securely automate their work in minutes, not months—no coding required.</p>
                <Button className=''>Explore Zapier Enterprize</Button>
            </div>
            <div className='w-1/2 p-4 '>
                <LoginForm />
            </div>
        </div>
    )
}

export default Page;