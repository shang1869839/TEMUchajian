import { Building2, Globe, Search, Calendar } from "lucide-react";

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
  "h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none transition-all placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15";

export default function FilterBar({ value, onChange }: FilterBarProps) {
  const update = (key: keyof FilterState, val: string) => {
    onChange({ ...value, [key]: val });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm animate-[fadeIn_0.5s_ease-out]">
      <div className="grid grid-cols-5 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 flex items-center">
            <Building2 className="w-3.5 h-3.5 mr-1.5" />
            店铺
          </label>
          <input
            type="text"
            value={value.store}
            onChange={(e) => update("store", e.target.value)}
            placeholder="请输入店铺 ID"
            className={inputBase + " w-full"}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 flex items-center">
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            站点
          </label>
          <select
            value={value.site}
            onChange={(e) => update("site", e.target.value)}
            className={inputBase + " w-full"}
          >
            <option value="">全部站点</option>
            <option value="US">美国站</option>
            <option value="EU">欧洲站</option>
            <option value="JP">日本站</option>
            <option value="MX">墨西哥站</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 flex items-center">
            <Search className="w-3.5 h-3.5 mr-1.5" />
            SKC 筛选
          </label>
          <input
            type="text"
            value={value.skcFilter}
            onChange={(e) => update("skcFilter", e.target.value)}
            placeholder="多个 SKC 用逗号分隔"
            className={inputBase + " w-full"}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            开始时间
          </label>
          <input
            type="datetime-local"
            value={value.startTime}
            onChange={(e) => update("startTime", e.target.value)}
            className={inputBase + " w-full"}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-500 flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            结束时间
          </label>
          <input
            type="datetime-local"
            value={value.endTime}
            onChange={(e) => update("endTime", e.target.value)}
            className={inputBase + " w-full"}
          />
        </div>
      </div>
    </div>
  );
}
