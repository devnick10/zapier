"use client";
import { usePublishZap } from "@/hooks/use-publish-zap";
import { CreateZapPayload } from "@/lib/types";
import { Button } from "./ui/button";
import { Spinner } from "./ui/sipinner";
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type PublishBUttonProps = CreateZapPayload;

export const PublishButton: React.FC<PublishBUttonProps> = ({
  actions,
  triggerId,
  triggerMetadata,
}) => {
  const { loading, publish, success } = usePublishZap();
  const router = useRouter();
  useEffect(() => {
    if (success === false) {
      toast.error("Failed to publish zap retry!");
    }
  }, [success]);

  return (
    <div className="absolute top-10 right-10 z-30 ">
      <Button
        className="flex gap-1 items-center font-medium "
        disabled={loading}
        variant={"purple"}
        onClick={async () => {
          await publish({
            triggerId,
            triggerMetadata,
            actions,
          });
          router.push("/dashboard");
        }}
      >
        Publish {loading && <Spinner className="size-5" />}
      </Button>
    </div>
  );
};
