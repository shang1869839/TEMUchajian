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

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-medium text-gray-600 flex items-center">
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
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center mb-5">
        <h3 className="text-base font-bold text-gray-900">2、重新报价条件</h3>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <RequiredLabel>核价次数</RequiredLabel>
          <div className="relative">
            <input
              type="text"
              value={value.maxCheckCount}
              onChange={(e) => update("maxCheckCount", e.target.value)}
              placeholder=""
              className={inputBase + " w-full pr-10"}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">次</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <RequiredLabel>则原申报价基础中降</RequiredLabel>
          <div className="relative">
            <input
              type="text"
              value={value.discountPercent}
              onChange={(e) => update("discountPercent", e.target.value)}
              placeholder=""
              className={inputBase + " w-full pr-10"}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
