import { X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterState {
  store: string;
  site: string;
  skcFilter: string;
  startTime: string;
  endTime: string;
}

interface FilterBarProps {
  value: FilterState;
  onChange: (value: FilterState) => void;
}

const inputBase =
  "h-9 w-full px-3 text-sm bg-[#f7f8fa] border border-gray-200 rounded-md outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs text-gray-600 flex items-center mb-1.5">
      <span className="text-red-500 mr-1">*</span>
      {children}
    </label>
  );
}

export default function FilterBar({ value, onChange }: FilterBarProps) {
  const update = (key: keyof FilterState, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5">
      <div className="grid grid-cols-5 gap-4">
        <div>
          <RequiredLabel>店铺</RequiredLabel>
          <div className="relative">
            <select
              value={value.store}
              onChange={(e) => update("store", e.target.value)}
              className={cn(inputBase, "appearance-none pr-8")}
            >
              <option value="">请选择店铺</option>
              <option value="634418228717904">634418228717904</option>
              <option value="1234567890">1234567890</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-600 flex items-center mb-1.5">站点</label>
          <div className="relative">
            <select
              value={value.site}
              onChange={(e) => update("site", e.target.value)}
              className={cn(inputBase, "appearance-none pr-16")}
            >
              <option value="">请选择站点</option>
              <option value="US">美国站</option>
              <option value="EU">欧洲站</option>
              <option value="JP">日本站</option>
              <option value="MX">墨西哥站</option>
            </select>
            <ChevronDown className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            {value.site && (
              <button
                type="button"
                onClick={() => update("site", "")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div>
          <RequiredLabel>skc筛选</RequiredLabel>
          <input
            type="text"
            value={value.skcFilter}
            onChange={(e) => update("skcFilter", e.target.value)}
            placeholder="多个用英文逗号、空格隔开"
            className={inputBase}
          />
        </div>

        <div>
          <RequiredLabel>开始时间</RequiredLabel>
          <input
            type="date"
            value={value.startTime}
            onChange={(e) => update("startTime", e.target.value)}
            className={cn(inputBase, "pr-2")}
          />
        </div>

        <div>
          <RequiredLabel>结束时间</RequiredLabel>
          <input
            type="date"
            value={value.endTime}
            onChange={(e) => update("endTime", e.target.value)}
            placeholder="选择结束时间"
            className={cn(inputBase, "pr-2")}
          />
        </div>
      </div>
    </div>
  );
}
