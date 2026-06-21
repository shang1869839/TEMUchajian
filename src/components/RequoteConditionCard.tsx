export interface RequoteCondition {
  maxCheckCount: string;
  discountPercent: string;
}

interface RequoteConditionCardProps {
  value: RequoteCondition;
  onChange: (value: RequoteCondition) => void;
}

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

export default function RequoteConditionCard({ value, onChange }: RequoteConditionCardProps) {
  const update = (key: keyof RequoteCondition, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <h3 className="text-[15px] font-bold text-gray-900 mb-4">2、重新报价条件</h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <RequiredLabel>核价次数</RequiredLabel>
          <div className="relative">
            <input
              type="text"
              value={value.maxCheckCount}
              onChange={(e) => update("maxCheckCount", e.target.value)}
              className={inputBase + " w-full pr-8"}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">次</span>
          </div>
        </div>

        <div>
          <RequiredLabel>则原申报价基础中降</RequiredLabel>
          <div className="relative">
            <input
              type="text"
              value={value.discountPercent}
              onChange={(e) => update("discountPercent", e.target.value)}
              className={inputBase + " w-full pr-8"}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
