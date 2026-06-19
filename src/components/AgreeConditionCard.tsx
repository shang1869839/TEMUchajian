import { useState } from "react";
import { cn } from "@/lib/utils";
import { CircleDollarSign, Percent, Hash } from "lucide-react";

export interface AgreeConditionItem {
  skuContains: string;
  officialPrice: string;
  maxReportPrice: string;
}

interface AgreeConditionCardProps {
  value: AgreeConditionItem[];
  onChange: (value: AgreeConditionItem[]) => void;
}

type PricingMode = "fixed" | "ratio" | "contains";

const modes: { key: PricingMode; label: string; icon: typeof CircleDollarSign }[] = [
  { key: "fixed", label: "固定价格方式", icon: CircleDollarSign },
  { key: "ratio", label: "申报价比例", icon: Percent },
  { key: "contains", label: "货号包含的方式", icon: Hash },
];

const inputBase =
  "h-9 px-3 text-sm bg-[#f7f8fa] border border-gray-200 rounded-md outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs text-gray-600 flex items-center mb-1.5">
      <span className="text-red-500 mr-1">*</span>
      {children}
    </label>
  );
}

export default function AgreeConditionCard({ value, onChange }: AgreeConditionCardProps) {
  const [mode, setMode] = useState<PricingMode>("contains");

  const updateRow = (index: number, key: keyof AgreeConditionItem, val: string) => {
    const next = value.map((row, i) => (i === index ? { ...row, [key]: val } : row));
    onChange(next);
  };

  const addRow = () => {
    onChange([...value, { skuContains: "", officialPrice: "", maxReportPrice: "" }]);
  };

  const removeRow = (index: number) => {
    if (value.length <= 1) return;
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-[15px] font-bold text-gray-900 mb-4">1、同意核价条件</h3>

      <div className="inline-flex rounded-lg border border-gray-200 p-0.5 mb-5">
        {modes.map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={cn(
              "flex items-center px-4 py-1.5 text-sm rounded-md transition-all",
              mode === m.key
                ? "bg-[#f0f0f0] text-gray-800 font-medium"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <m.icon className="w-3.5 h-3.5 mr-1.5" />
            {m.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {value.map((row, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_1fr_40px] gap-3 items-end">
            <div>
              <RequiredLabel>当货号含有</RequiredLabel>
              <input
                type="text"
                value={row.skuContains}
                onChange={(e) => updateRow(index, "skuContains", e.target.value)}
                className={cn(inputBase, "w-full")}
              />
            </div>

            <div>
              <RequiredLabel>官方申报价</RequiredLabel>
              <div className="relative">
                <input
                  type="text"
                  value={row.officialPrice}
                  onChange={(e) => updateRow(index, "officialPrice", e.target.value)}
                  className={cn(inputBase, "w-full pr-8")}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">元</span>
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-600 flex items-center mb-1.5">
                最大同意上报价格：
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={row.maxReportPrice}
                  onChange={(e) => updateRow(index, "maxReportPrice", e.target.value)}
                  className={cn(inputBase, "w-full pr-8")}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">元</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeRow(index)}
              disabled={value.length <= 1}
              className="h-9 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-colors disabled:opacity-40"
            >
              <span className="text-lg leading-none">—</span>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-3 px-4 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
      >
        添加货号
      </button>
    </div>
  );
}
