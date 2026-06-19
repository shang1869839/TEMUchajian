import { useEffect, useState } from "react";
import { Play, Database, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import MainSidebar from "@/components/MainSidebar";
import SubSidebar from "@/components/SubSidebar";
import FilterBar, { type FilterState } from "@/components/FilterBar";
import AgreeConditionCard, { type AgreeCondition } from "@/components/AgreeConditionCard";
import RequoteConditionCard, { type RequoteCondition } from "@/components/RequoteConditionCard";
import AbandonConditionCard, { type AbandonStrategy } from "@/components/AbandonConditionCard";
import { callFunction } from "@/lib/cloudbase";

const initialFilters: FilterState = {
  store: "",
  site: "",
  skcFilter: "",
  startTime: "",
  endTime: "",
};

const initialAgree: AgreeCondition = {
  skuContains: "",
  officialPrice: "",
  maxReportPrice: "",
};

const initialRequote: RequoteCondition = {
  maxCheckCount: "",
  discountPercent: "",
};

export default function Home() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [agree, setAgree] = useState<AgreeCondition>(initialAgree);
  const [requote, setRequote] = useState<RequoteCondition>(initialRequote);
  const [abandon, setAbandon] = useState<AbandonStrategy>("reject");

  const [loading, setLoading] = useState(false);
  const [pinging, setPinging] = useState(false);
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
          agreeJson: AgreeCondition;
          requoteJson: RequoteCondition;
          abandonStrategy: AbandonStrategy;
        };
        setFilters({
          store,
          site: data.site || "",
          skcFilter: data.skcFilter || "",
          startTime: data.startTime || "",
          endTime: data.endTime || "",
        });
        setAgree(data.agreeJson || initialAgree);
        setRequote(data.requoteJson || initialRequote);
        setAbandon(data.abandonStrategy || "reject");
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("读取配置失败", err);
    }
  };

  const handlePing = async () => {
    setPinging(true);
    try {
      const res = await callFunction("priceReviewApi", { action: "ping" });
      showToast(res.code === 0 ? "success" : "error", res.message);
    } catch (err) {
      showToast("error", "测试连接失败，请检查网络或 CloudBase 配置");
    } finally {
      setPinging(false);
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
    <div className="flex min-h-screen bg-gray-100/60">
      <MainSidebar />
      <SubSidebar />

      <main className="flex-1 min-w-[1024px] flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8">
          <h1 className="text-lg font-bold text-gray-900">固定核价配置</h1>
          <span className="ml-3 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">按店铺批量设置自动核价策略</span>
        </header>

        <div className="flex-1 p-6 pb-28 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-5">
            <FilterBar value={filters} onChange={setFilters} />
            <AgreeConditionCard value={agree} onChange={setAgree} />
            <RequoteConditionCard value={requote} onChange={setRequote} />
            <AbandonConditionCard value={abandon} onChange={setAbandon} />
          </div>
        </div>

        <div className="fixed bottom-0 left-[380px] right-0 bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between z-10">
          <div className="text-sm text-gray-500">
            配置完成并核对无误后，点击「开始自动核价」保存策略。
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handlePing}
              disabled={pinging}
              className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
            >
              {pinging ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Database className="w-4 h-4 mr-2" />}
              测试数据库连接
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-500/20 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
              开始自动核价
            </button>
          </div>
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
