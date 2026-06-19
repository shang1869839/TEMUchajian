import { cn } from "@/lib/utils";

const subNavItems = [
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
];

export default function SubSidebar() {
  return (
    <aside className="w-[160px] min-h-screen bg-[#f7f8fa] border-r border-gray-200 flex flex-col shrink-0">
      <nav className="flex-1 py-2 space-y-0.5">
        {subNavItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "block px-4 py-2 text-sm transition-colors rounded-md mx-2",
              item.active
                ? "text-gray-900 font-medium bg-[#eeeeee]"
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
