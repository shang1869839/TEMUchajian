import { cn } from "@/lib/utils";

const subNavItems = [
  { label: "商品管理", active: false },
  { label: "同步库存", active: false },
  { label: "成本核价", active: false },
  { label: "固定核价", active: true },
  { label: "自动调价", active: false },
  { label: "批量操作", active: false },
];

export default function SubSidebar() {
  return (
    <aside className="w-[160px] min-h-screen bg-gray-50/80 border-r border-gray-200 flex flex-col shrink-0">
      <div className="h-16 flex items-center px-5 border-b border-gray-100">
        <span className="text-sm font-semibold text-gray-700">商品中心</span>
      </div>

      <nav className="flex-1 py-4 space-y-1">
        {subNavItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "block px-5 py-2.5 text-sm transition-colors",
              item.active
                ? "text-emerald-600 font-medium bg-white border-r-2 border-emerald-500"
                : "text-gray-600 hover:text-gray-900 hover:bg-white"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
