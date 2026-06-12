"use client";

import { useAvailableActionsAndTriggers } from "@/hooks/use-actions-and-triggers";
import { ActionType, TriggerType } from "@/lib/types";
import { useState } from "react";
import { Input } from "./ui/input";
import { OnSelecProps } from "./flow/types";
import { Button } from "./ui/button";


type ZapNodeSelectorProps = {
  index: number;
  onSelect: (props: null | OnSelecProps) => void;
};

export const ZapNodeSelector: React.FC<ZapNodeSelectorProps> = ({
  onSelect,
  index,
}) => {
  const { availabelTriggers, availableActions } =
    useAvailableActionsAndTriggers();
  const isTrigger = index === 1;
  console.log(availabelTriggers)
  const [selectedAction, setSelectedAction] = useState<ActionType | null>(null)
  const [step, setStep] = useState<number>(0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="w-full max-w-full flex justify-between items-center mb-4  ">
          <h2 className="font-semibold">
            Select {index === 1 ? "Trigger" : "Action"}
          </h2>

          <button
            onClick={() => {
              onSelect(null);
            }}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="">
          {(step === 1 && selectedAction?.name === "email") && <EmailSelector setMetadata={(metadata) => {
            onSelect({
              ...selectedAction,
              metadata,
            });
          }} />}
          {(step === 1 && selectedAction?.name === "solana") && <SolanaSelector setMetadata={(metadata) => {
            onSelect({
              ...selectedAction,
              metadata,
            });
          }} />}
          {
            <ul>
              {isTrigger && step === 0 &&
                availabelTriggers.map((item) => (
                  <ItemBar
                    key={item.id}
                    item={item}
                    onClick={() => {
                      onSelect(item);
                    }}
                  />
                ))}
              {!isTrigger && step === 0 &&
                availableActions.map((item) => (
                  <ItemBar
                    key={item.id}
                    item={item}
                    onClick={() => {
                      setStep(prev => prev + 1)
                      setSelectedAction(item)
                    }}
                  />
                ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
};

function ItemBar({
  item,
  onClick,
}: {
  onClick: () => void;
  item: ActionType | TriggerType;
}) {
  return (
    <li onClick={onClick} className="flex gap-2 my-1" key={item.id}>
      <img src={item.image} width={32} height={32} alt="image" />
      <span>{item.name}</span>
    </li>
  );
}

function EmailSelector({ setMetadata }: { setMetadata: (props: any) => void }) {
  const [mailDetails, setMailDetails] = useState<{ to: string, body: string }>({ to: "", body: "" })
  return <div className="">
    <Input
      onChange={(e) => {
        setMailDetails(prev => {
          return { ...prev, to: e.target.value }
        })
      }}
      value={mailDetails?.to}
      placeholder="To"
    />
    <Input
      className="my-4"
      value={mailDetails?.body}
      onChange={(e) => {
        setMailDetails(prev => {
          return { ...prev, body: e.target.value }
        })
      }}
      placeholder="body"
    />
    <Button variant={"purple"} onClick={() => {
      setMetadata(mailDetails)
    }}>save</Button>
  </div>
}

function SolanaSelector({ setMetadata }: { setMetadata: (props: any) => void }) {
  const [details, setDetails] = useState<{ to: string, amount: string }>({ to: "", amount: "" });
  return <div className="">
    <Input
      className=""
      value={details.to}
      onChange={(e) => {
        setDetails(prev => ({ ...prev, to: e.target.value }))
      }}
      placeholder="To"
    />
    <Input
      className="my-4"
      value={details.amount}
      onChange={(e) => {
        setDetails(prev => ({ ...prev, amount: e.target.value }))
      }}
      placeholder="Amount"
    />
    <Button variant={"purple"} onClick={() => {
      setMetadata(details)
    }}>save</Button>
  </div>
}