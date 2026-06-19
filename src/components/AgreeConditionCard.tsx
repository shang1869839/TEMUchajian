import { useState } from "react";
import { cn } from "@/lib/utils";
import { CircleDollarSign, Percent, Hash, Minus, Plus } from "lucide-react";

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
  "h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15";

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-medium text-gray-600 flex items-center">
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
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center mb-5">
        <h3 className="text-base font-bold text-gray-900">1、同意核价条件</h3>
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

      <div className="space-y-4">
        {value.map((row, index) => (
          <div key={index} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
            <div className="space-y-1.5">
              <RequiredLabel>当货号含有</RequiredLabel>
              <input
                type="text"
                value={row.skuContains}
                onChange={(e) => updateRow(index, "skuContains", e.target.value)}
                placeholder=""
                className={cn(inputBase, "w-full")}
              />
            </div>

            <div className="space-y-1.5">
              <RequiredLabel>官方申报价</RequiredLabel>
              <div className="relative">
                <input
                  type="text"
                  value={row.officialPrice}
                  onChange={(e) => updateRow(index, "officialPrice", e.target.value)}
                  placeholder=""
                  className={cn(inputBase, "w-full pr-10")}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">元</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">最大同意上报价格：</label>
              <div className="relative">
                <input
                  type="text"
                  value={row.maxReportPrice}
                  onChange={(e) => updateRow(index, "maxReportPrice", e.target.value)}
                  placeholder=""
                  className={cn(inputBase, "w-full pr-10")}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">元</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeRow(index)}
              disabled={value.length <= 1}
              className="h-10 w-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-300 hover:bg-red-50 transition-colors disabled:opacity-40 disabled:hover:text-gray-400 disabled:hover:border-gray-200 disabled:hover:bg-transparent"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Plus className="w-4 h-4 mr-1.5" />
        添加货号
      </button>
    </div>
  );
}
