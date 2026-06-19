import { useEffect, useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import MainSidebar from "@/components/MainSidebar";
import SubSidebar from "@/components/SubSidebar";
import FilterBar, { type FilterState } from "@/components/FilterBar";
import AgreeConditionCard, { type AgreeConditionItem } from "@/components/AgreeConditionCard";
import RequoteConditionCard, { type RequoteCondition } from "@/components/RequoteConditionCard";
import AbandonConditionCard, { type AbandonStrategy } from "@/components/AbandonConditionCard";
import { callFunction } from "@/lib/cloudbase";

const initialFilters: FilterState = {
  store: "634418228717904",
  site: "US",
  skcFilter: "",
  startTime: "2026-05-31",
  endTime: "",
};

const initialAgree: AgreeConditionItem[] = [
  { skuContains: "DX", officialPrice: "≥ 35", maxReportPrice: "40" },
  { skuContains: "DXDZ", officialPrice: "≥ 25", maxReportPrice: "35" },
];

const initialRequote: RequoteCondition = {
  maxCheckCount: "< 4",
  discountPercent: "1",
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [agree, setAgree] = useState<AgreeConditionItem[]>(initialAgree);
  const [requote, setRequote] = useState<RequoteCondition>(initialRequote);
  const [abandon, setAbandon] = useState<AbandonStrategy>("reject");

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (filters.store) {
      loadConfig(filters.store);
    }
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const loadConfig = async (store: string) => {
    try {
      const res = await callFunction("priceReviewApi", { action: "getConfig", data: { store } });
      if (res.code === 0 && res.data) {
        const data = res.data as {
          site: string;
          skcFilter: string;
          startTime: string;
          endTime: string;
          agreeJson: AgreeConditionItem[];
          requoteJson: RequoteCondition;
          abandonStrategy: AbandonStrategy;
        };
        setFilters((prev) => ({
          ...prev,
          store,
          site: data.site || "",
          skcFilter: data.skcFilter || "",
          startTime: data.startTime || "",
          endTime: data.endTime || "",
        }));
        setAgree(Array.isArray(data.agreeJson) && data.agreeJson.length ? data.agreeJson : initialAgree);
        setRequote(data.requoteJson || initialRequote);
        setAbandon(data.abandonStrategy || "reject");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("读取配置失败", err);
    }
  };

  const handleSave = async () => {
    if (!filters.store) {
      showToast("error", "请填写店铺 ID");
      return;
    }

    setLoading(true);
    try {
      const res = await callFunction("priceReviewApi", {
        action: "saveConfig",
        data: {
          store: filters.store,
          site: filters.site,
          skcFilter: filters.skcFilter,
          startTime: filters.startTime,
          endTime: filters.endTime,
          agreeJson: agree,
          requoteJson: requote,
          abandonStrategy: abandon,
        },
      });
      showToast(res.code === 0 ? "success" : "error", res.message);
    } catch (err) {
      showToast("error", "保存配置失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f6f8]">
      <MainSidebar />
      <SubSidebar />

      <main className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <div className="flex-1 p-4 pb-24 overflow-y-auto overflow-x-hidden">
          <div className="space-y-4">
            <FilterBar value={filters} onChange={setFilters} />
            <AgreeConditionCard value={agree} onChange={setAgree} />
            <RequoteConditionCard value={requote} onChange={setRequote} />
            <AbandonConditionCard value={abandon} onChange={setAbandon} />
          </div>
        </div>

        <div className="h-16 bg-white border-t border-gray-200 px-6 flex items-center justify-end z-10 shrink-0">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-emerald-500 rounded-md hover:bg-emerald-600 transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            开始自动核价
          </button>
        </div>
      </main>

      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-[fadeIn_0.2s_ease-out]">
          <div
            className={`flex items-center px-4 py-3 rounded-lg shadow-lg border ${
              toast.type === "success"
                ? "bg-white border-emerald-200 text-emerald-700"
                : "bg-white border-red-200 text-red-700"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
