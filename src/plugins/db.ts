// src/plugins/db.ts
import { FastifyInstance } from "fastify";
import { Pool, PoolClient } from "pg";

type DbConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  ssl?: boolean;
  max?: number;       // tamaño del pool
  idleTimeoutMs?: number;
};

function loadConfig(): DbConfig {
  const {
    DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME
  } = process.env;

  if (!DB_HOST || !DB_USER || !DB_PASS || !DB_NAME) {
    throw new Error("DB config missing: require DB_HOST, DB_USER, DB_PASS, DB_NAME");
  }

  return {
    host: DB_HOST,
    port: Number(DB_PORT ?? 5432),
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
  };
}

export async function registerDb(app: FastifyInstance) {
  const cfg = loadConfig();

  const pool = new Pool({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database,
    max: cfg.max,
    idleTimeoutMillis: cfg.idleTimeoutMs,
    ssl: cfg.ssl ? { rejectUnauthorized: false } : undefined,
  });

  // Probar conexión al arrancar (fail fast)
  await pool.query("SELECT 1");

  // Decoramos utilidades
  app.decorate("pg", pool);

  // Cierre ordenado
  app.addHook("onClose", async () => {
    await pool.end();
  });

  app.log.info("📦 Postgres pool ready");
}

// Augment Fastify types
declare module "fastify" {
  interface FastifyInstance {
    pg: Pool;
    pgTx: <T>(fn: (client: PoolClient) => Promise<T>) => Promise<T>;
  }
}
