const mysql = require("mysql2/promise");

// 从环境变量读取数据库配置
const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000,
};

let connectionPool = null;

function getPool() {
  if (!connectionPool) {
    connectionPool = mysql.createPool({ ...dbConfig, waitForConnections: true });
  }
  return connectionPool;
}

function response(code, message, data) {
  return { code, message, data };
}

exports.main = async (event) => {
  const { action, data = {} } = event;

  try {
    if (action === "ping") {
      const pool = getPool();
      const [rows] = await pool.execute("SELECT 1 AS ok");
      return response(0, "数据库连接成功", rows[0]);
    }

    if (action === "saveConfig") {
      const {
        store,
        site,
        skcFilter,
        startTime,
        endTime,
        agreeJson,
        requoteJson,
        abandonStrategy,
      } = data;

      if (!store) {
        return response(400, "店铺 ID 不能为空");
      }

      const pool = getPool();
      const sql = `
        INSERT INTO price_review_configs
          (store, site, skc_filter, start_time, end_time, agree_json, requote_json, abandon_strategy)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          site = VALUES(site),
          skc_filter = VALUES(skc_filter),
          start_time = VALUES(start_time),
          end_time = VALUES(end_time),
          agree_json = VALUES(agree_json),
          requote_json = VALUES(requote_json),
          abandon_strategy = VALUES(abandon_strategy),
          updated_at = CURRENT_TIMESTAMP
      `;

      await pool.execute(sql, [
        store,
        site || "",
        skcFilter || "",
        startTime || "",
        endTime || "",
        JSON.stringify(agreeJson || {}),
        JSON.stringify(requoteJson || {}),
        abandonStrategy || "reject",
      ]);

      return response(0, "配置保存成功", { store });
    }

    if (action === "getConfig") {
      const { store } = data;
      if (!store) {
        return response(400, "店铺 ID 不能为空");
      }

      const pool = getPool();
      const [rows] = await pool.execute(
        "SELECT * FROM price_review_configs WHERE store = ? LIMIT 1",
        [store]
      );

      if (rows.length === 0) {
        return response(1, "未找到该店铺配置");
      }

      const row = rows[0];
      return response(0, "ok", {
        store: row.store,
        site: row.site,
        skcFilter: row.skc_filter,
        startTime: row.start_time,
        endTime: row.end_time,
        agreeJson: typeof row.agree_json === "string" ? JSON.parse(row.agree_json) : row.agree_json,
        requoteJson: typeof row.requote_json === "string" ? JSON.parse(row.requote_json) : row.requote_json,
        abandonStrategy: row.abandon_strategy,
      });
    }

    return response(-1, "未支持的 action");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("priceReviewApi error:", err);
    return response(500, err.message || "服务器内部错误");
  }
};
