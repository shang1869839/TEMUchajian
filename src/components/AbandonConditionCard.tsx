import { cn } from "@/lib/utils";
import { XCircle, EyeOff } from "lucide-react";

export type AbandonStrategy = "reject" | "ignore";

interface AbandonConditionCardProps {
  value: AbandonStrategy;
  onChange: (value: AbandonStrategy) => void;
}

const strategies: { key: AbandonStrategy; label: string; desc: string; icon: typeof XCircle }[] = [
  {
    key: "reject",
    label: "拒绝，放弃上新",
    desc: "核价失败则自动拒绝并放弃该商品上新",
    icon: XCircle,
  },
  {
    key: "ignore",
    label: "忽略，不处理",
    desc: "核价失败则保持原状，等待人工处理",
    icon: EyeOff,
  },
];

export default function AbandonConditionCard({ value, onChange }: AbandonConditionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-[fadeIn_0.8s_ease-out]">
      <div className="flex items-center mb-5">
        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold mr-2.5">
          3
        </div>
        <h3 className="text-base font-semibold text-gray-900">放弃核价条件</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {strategies.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => onChange(s.key)}
            className={cn(
              "flex items-start p-4 rounded-xl border text-left transition-all",
              value === s.key
                ? "bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500"
                : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            )}
          >
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-3",
                value === s.key ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500"
              )}
            >
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <div
                className={cn(
                  "text-sm font-semibold",
                  value === s.key ? "text-emerald-800" : "text-gray-900"
                )}
              >
                {s.label}
              </div>
              <div className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
