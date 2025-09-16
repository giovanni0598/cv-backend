import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/ping", async () => {
  return { message: "pong" };
});

const start = async () => {
  try {
    await app.listen({ port: 8080, host: "0.0.0.0" });
    console.log("🚀 Server running on http://localhost:8080");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();