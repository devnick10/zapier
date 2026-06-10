"use client";

import { useAvailableActionsAndTriggers } from "@/hooks/use-actions-and-triggers";
import { ActionType, TriggerType } from "@/lib/types";

type ZapNodeSelectorProps = {
  index: number;
  onSelect: (props: null | ActionType | TriggerType) => void;
};

export const ZapNodeSelector: React.FC<ZapNodeSelectorProps> = ({
  onSelect,
  index,
}) => {
  const { availabelTriggers, availableActions } =
    useAvailableActionsAndTriggers();
  const isTrigger = index === 1;
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
          <ul>
            {isTrigger &&
              availabelTriggers.map((item) => (
                <ItemBar
                  key={item.id}
                  item={item}
                  onClick={() => {
                    onSelect(item);
                  }}
                />
              ))}
            {!isTrigger &&
              availableActions.map((item) => (
                <ItemBar
                  key={item.id}
                  item={item}
                  onClick={() => {
                    onSelect(item);
                  }}
                />
              ))}
          </ul>
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
    <li onClick={onClick} className="flex gap-2" key={item.id}>
      <img src={item.image} width={32} height={32} alt="image" />
      <span>{item.name}</span>
    </li>
  );
}
