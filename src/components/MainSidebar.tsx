import { Boxes, LayoutDashboard, Store, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { label: "TEMU", icon: LayoutDashboard, active: false },
  { label: "上品中心", icon: Boxes, active: false },
  { label: "店铺授权", icon: Store, active: false },
  { label: "系统设置", icon: Settings, active: false },
  { label: "帮助中心", icon: HelpCircle, active: false },
];

export default function MainSidebar() {
  return (
    <aside className="w-[220px] min-h-screen bg-white border-r border-gray-200 flex flex-col shrink-0">
      <div className="h-16 flex items-center px-5 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center mr-3">
          <Boxes className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-gray-900">大卖家</span>
      </div>

      <nav className="flex-1 py-4 space-y-1">
        {mainNavItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "flex items-center px-5 py-3 text-sm font-medium transition-colors",
              item.active
                ? "text-emerald-600 bg-emerald-50/60"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <item.icon className="w-[18px] h-[18px] mr-3" />
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
