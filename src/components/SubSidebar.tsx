import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SubNavSection {
  label: string;
  expanded: boolean;
  active?: boolean;
  items?: { label: string; active?: boolean }[];
}

const initialSections: SubNavSection[] = [
  {
    label: "商品管理",
    expanded: true,
    active: true,
    items: [
      { label: "同步库存", active: false },
      { label: "成本核价", active: false },
      { label: "固定核价", active: true },
      { label: "自动调价", active: false },
      { label: "跟价管理", active: false },
      { label: "商品下架", active: false },
      { label: "商品上架", active: false },
      { label: "重复下架", active: false },
      { label: "修改货号", active: false },
      { label: "滞销检测", active: false },
      { label: "货号成本", active: false },
      { label: "商品编辑", active: false },
      { label: "批量零售", active: false },
    ],
  },
  { label: "店铺营销", expanded: false },
  { label: "合规中心", expanded: false },
  { label: "产品维护", expanded: false },
];

export default function SubSidebar() {
  const [sections, setSections] = useState<SubNavSection[]>(initialSections);

  const toggleSection = (index: number) => {
    setSections((prev) =>
      prev.map((section, i) => (i === index ? { ...section, expanded: !section.expanded } : section))
    );
  };

  return (
    <aside className="w-[160px] h-screen bg-[#f7f8fa] border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto">
      <nav className="flex-1 py-2 space-y-0.5">
        {sections.map((section, index) => (
          <div key={section.label}>
            <button
              type="button"
              onClick={() => toggleSection(index)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 mx-2 text-sm rounded-md transition-colors",
                section.active
                  ? "text-emerald-600 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white"
              )}
            >
              <span>{section.label}</span>
              {section.expanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {section.expanded && section.items && (
              <div className="mt-0.5 space-y-0.5">
                {section.items.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    className={cn(
                      "block px-4 py-1.5 text-sm transition-colors rounded-md mx-2",
                      item.active
                        ? "text-gray-900 font-medium bg-[#eeeeee]"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
