"use client";

import { ActionType, TriggerType } from "@/lib/types";

type ModelProps = {
  index: number;
  onSelect: (props: null | ActionType | TriggerType) => void;
  items: ActionType[] | TriggerType[];
};

export const Model: React.FC<ModelProps> = ({ onSelect, index, items }) => {
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
            {items &&
              items.map((item) => {
                return (
                  <li
                    onClick={() => {
                      onSelect(item);
                    }}
                    className="flex gap-2"
                    key={item.id}
                  >
                    <img src={item.image} width={32} height={32} alt="image" />
                    <span>{item.name}</span>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
