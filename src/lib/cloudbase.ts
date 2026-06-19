export interface CloudBaseResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

export interface PriceReviewConfig {
  store: string;
  site: string;
  skcFilter: string;
  startTime: string;
  endTime: string;
  agreeJson: {
    skuContains: string;
    officialPrice: string;
    maxReportPrice: string;
  };
  requoteJson: {
    maxCheckCount: string;
    discountPercent: string;
  };
  abandonStrategy: "reject" | "ignore";
}

let mockConfig: PriceReviewConfig | null = null;

/**
 * 调用 CloudBase 云函数 priceReviewApi
 * 当前为本地模拟实现，接入 CloudBase 后请替换为 @cloudbase/js-sdk 的 callFunction
 */
export async function callFunction<T = unknown>(
  name: string,
  params: Record<string, unknown>
): Promise<CloudBaseResponse<T>> {
  // eslint-disable-next-line no-console
  console.log(`[CloudBase Mock] callFunction(${name})`, params);

  await new Promise((resolve) => setTimeout(resolve, 400));

  if (name !== "priceReviewApi") {
    return { code: -1, message: "未支持的云函数" };
  }

  const action = params.action as string;

  if (action === "ping") {
    return { code: 0, message: "数据库连接成功", data: { ok: true } as T };
  }

  if (action === "saveConfig") {
    mockConfig = params.data as PriceReviewConfig;
    return { code: 0, message: "配置保存成功", data: mockConfig as T };
  }

  if (action === "getConfig") {
    if (!mockConfig) {
      return { code: 1, message: "未找到该店铺配置" };
    }
    return { code: 0, message: "ok", data: mockConfig as T };
  }

  return { code: -1, message: "未支持的 action" };
}
