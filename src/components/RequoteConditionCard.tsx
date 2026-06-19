import { RefreshCcw } from "lucide-react";

export interface RequoteCondition {
  maxCheckCount: string;
  discountPercent: string;
}

interface RequoteConditionCardProps {
  value: RequoteCondition;
  onChange: (value: RequoteCondition) => void;
}

const inputBase =
  "h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15";

export default function RequoteConditionCard({ value, onChange }: RequoteConditionCardProps) {
  const update = (key: keyof RequoteCondition, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-[fadeIn_0.7s_ease-out]">
      <div className="flex items-center mb-5">
        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mr-2.5">
          2
        </div>
        <h3 className="text-base font-semibold text-gray-900">重新报价条件</h3>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 space-y-1.5">
          <label className="text-xs font-medium text-gray-500 flex items-center">
            <RefreshCcw className="w-3.5 h-3.5 mr-1.5" />
            核价次数达到
          </label>
          <input
            type="number"
            min={1}
            value={value.maxCheckCount}
            onChange={(e) => update("maxCheckCount", e.target.value)}
            placeholder="例如：2"
            className={inputBase + " w-full"}
          />
        </div>

        <div className="pt-6 text-sm text-gray-500">次后</div>

        <div className="flex-[2] space-y-1.5">
          <label className="text-xs font-medium text-gray-500">则原申报价基础中降</label>
          <div className="relative">
            <input
              type="number"
              min={0}
              max={100}
              value={value.discountPercent}
              onChange={(e) => update("discountPercent", e.target.value)}
              placeholder="例如：5"
              className={inputBase + " w-full pr-8"}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
