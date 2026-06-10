import { Spinner } from "./ui/sipinner";

export const PageLoader: React.FC = () => {
  return (
    <div className=" w-full max-w-full h-screen flex items-center justify-center gap-2 text-xl mt-6">
      {" "}
      <span>Loading</span> <Spinner className="size-6" />
    </div>
  );
};
