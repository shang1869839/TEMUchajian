import { cn } from "@/lib/utils";

export type AbandonStrategy = "reject" | "ignore";

interface AbandonConditionCardProps {
  value: AbandonStrategy;
  onChange: (value: AbandonStrategy) => void;
}

const strategies: { key: AbandonStrategy; label: string }[] = [
  { key: "reject", label: "拒绝，放弃上新" },
  { key: "ignore", label: "忽略，不处理" },
];

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs text-gray-600 flex items-center mb-2">
      <span className="text-red-500 mr-1">*</span>
      {children}
    </label>
  );
}

export default function AbandonConditionCard({ value, onChange }: AbandonConditionCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-[15px] font-bold text-gray-900 mb-4">3、放弃核价条件</h3>

      <RequiredLabel>不符合以上条件下，是否放弃核价</RequiredLabel>
      <div className="flex items-center space-x-8">
        {strategies.map((s) => (
          <label key={s.key} className="inline-flex items-center cursor-pointer group">
            <span
              className={cn(
                "w-4 h-4 rounded-full border flex items-center justify-center mr-2 transition-colors",
                value === s.key ? "border-emerald-500" : "border-gray-300 group-hover:border-gray-400"
              )}
            >
              {value === s.key && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
            </span>
            <input
              type="radio"
              name="abandonStrategy"
              value={s.key}
              checked={value === s.key}
              onChange={() => onChange(s.key)}
              className="sr-only"
            />
            <span className="text-sm text-gray-700">{s.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
