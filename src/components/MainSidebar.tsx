import {
  Boxes,
  ShoppingBag,
  Globe,
  Store,
  Wallet,
  BarChart3,
  Download,
  FileText,
  Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: typeof Boxes;
  active?: boolean;
}

const mainNavItems: NavItem[] = [
  { label: "商品管理", icon: ShoppingBag, active: true },
  { label: "TEMU", icon: Globe, active: false },
  { label: "上品中心", icon: Boxes, active: false },
  { label: "店铺授权", icon: Store, active: false },
  { label: "充值服务", icon: Wallet, active: false },
  { label: "统计报表", icon: BarChart3, active: false },
  { label: "下载插件", icon: Download, active: false },
  { label: "用户须知", icon: FileText, active: false },
  { label: "系统公告", icon: Megaphone, active: false },
];

export default function MainSidebar() {
  return (
    <aside className="w-[200px] h-screen bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto overflow-x-hidden">
      <div className="h-[60px] flex items-center px-4 border-b border-gray-100 shrink-0">
        <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center mr-2.5 shrink-0">
          <span className="text-white font-bold text-sm">m</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900 leading-tight">大卖家</span>
          <span className="text-[10px] text-gray-400 leading-tight">v3.2.23</span>
        </div>
      </div>

      <nav className="flex-1 py-2 space-y-0.5">
        {mainNavItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "flex items-center px-4 py-2.5 mx-2 text-sm rounded-md transition-colors",
              item.active
                ? "text-emerald-600 bg-emerald-50 font-medium"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <item.icon className="w-[18px] h-[18px] mr-3 text-gray-500" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
