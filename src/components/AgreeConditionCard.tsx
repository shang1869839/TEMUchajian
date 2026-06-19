import { useState } from "react";
import { cn } from "@/lib/utils";
import { CircleDollarSign, Percent, Hash } from "lucide-react";

export interface AgreeCondition {
  skuContains: string;
  officialPrice: string;
  maxReportPrice: string;
}

interface AgreeConditionCardProps {
  value: AgreeCondition;
  onChange: (value: AgreeCondition) => void;
}

type PricingMode = "fixed" | "ratio" | "contains";

const modes: { key: PricingMode; label: string; icon: typeof CircleDollarSign }[] = [
  { key: "fixed", label: "固定价格方式", icon: CircleDollarSign },
  { key: "ratio", label: "申报价比例", icon: Percent },
  { key: "contains", label: "货号包含方式", icon: Hash },
];

const inputBase =
  "h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15";

export default function AgreeConditionCard({ value, onChange }: AgreeConditionCardProps) {
  const [mode, setMode] = useState<PricingMode>("fixed");

  const update = (key: keyof AgreeCondition, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-[fadeIn_0.6s_ease-out]">
      <div className="flex items-center mb-5">
        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mr-2.5">
          1
        </div>
        <h3 className="text-base font-semibold text-gray-900">同意核价条件</h3>
      </div>

      <div className="flex space-x-2 mb-6">
        {modes.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all",
              mode === m.key
                ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            )}
          >
            <m.icon className="w-4 h-4 mr-1.5" />
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500">当货号含有</label>
          <input
            type="text"
            value={value.skuContains}
            onChange={(e) => update("skuContains", e.target.value)}
            placeholder="例如：SKU-2024"
            className={inputBase + " w-full"}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500">官方申报价</label>
          <input
            type="text"
            value={value.officialPrice}
            onChange={(e) => update("officialPrice", e.target.value)}
            placeholder="0.00"
            className={inputBase + " w-full"}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500">最大同意上报价格</label>
          <input
            type="text"
            value={value.maxReportPrice}
            onChange={(e) => update("maxReportPrice", e.target.value)}
            placeholder="0.00"
            className={inputBase + " w-full"}
          />
        </div>
      </div>

      {mode === "ratio" && (
        <p className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          按官方申报价的比例进行同意核价，最大同意上报价格将作为上限。
        </p>
      )}
      {mode === "contains" && (
        <p className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          仅对货号包含指定关键词的 SKU 执行自动同意核价。
        </p>
      )}
    </div>
  );
}
