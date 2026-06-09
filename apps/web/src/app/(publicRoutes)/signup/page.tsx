import { SignupForm } from "@/components/signup-form";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] w-full max-w-5xl mx-auto flex gap-2 items-center justify-center ">
      <div className=" w-1/2 flex flex-col gap-4 items-start justify-center p-4 rounded-sm">
        <h2 className="text-2xl">
          AI Automation starts and scales with Zapier
        </h2>
        <p>
          Orchestrate AI across your teams, tools, and processes. Turn ideas
          into automated action today, and power tomorrow’s business growth.
        </p>
      </div>
      <div className="w-1/2 p-4 ">
        <SignupForm />
      </div>
    </div>
  );
};

export default Page;
