import React from 'react'
import { Button } from './ui/button'

export const HeroSection: React.FC = () => {
    return (
        <>
            <div className='mt-10 max-w-7xl mx-auto flex flex-col gap-6 items-center justify-center '>
                <p className='text-neutral-300 text-sm'>AI automation, governed</p>
                <h1 className='font-medium text-4xl'>Your tools. Your rules. Any AI.</h1>
                <p className='text-sm text-center w-xl'>Zapier gives teams one place to set guardrails, manage model access, and see everything — so everyone can build with AI confidently, on any model, without waiting for permission.</p>
                <div className='flex gap-4'>
                    <Button variant={"secondary"}>Start free with email</Button>
                    <Button className='border dark:border-neutral-400 border-neutral-200'>Start free with Google</Button>
                </div>
                <div className='size-1/2'>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={false}
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate noremoteplayback"
                        className="w-full h-auto rounded-xl"
                        src="https://res.cloudinary.com/zapier-media/video/upload/so_3.8/q_auto/f_auto/c_scale,w_1920/v1745864783/aiworkflowshomepage.mp4"
                    />                </div>
            </div>
        </>
    )
}
