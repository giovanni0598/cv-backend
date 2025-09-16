import Fastify from "fastify";
import { registerSwagger } from "./plugins/swagger";
import { registerDb } from "./plugins/db";
import { registerSqs } from "./plugins/sqs";
import profilesRoutes from "./routes/profiles";

import { PgProfileRepository } from "./adapters/pg-profile-repo";
import { SqsCommandBus } from "./adapters/sqs-command-bus";
import { GetProfileById } from "./app/get-profile-by-id";
import { CreateProfile } from "./app/create-profile";

const app = Fastify({ logger: true });

// plugins infra
async function registerPlugins() {
  await registerSwagger(app);
  await registerDb(app);
  await registerSqs(app);
}

// Immediately-invoked async function to allow top-level await
await (async () => {
  await registerPlugins();

  // wiring de puertos/implementaciones
  const repo = new PgProfileRepository(app.pg);
  const bus  = new SqsCommandBus(app.sqs, process.env.SQS_URL!);

  // casos de uso
  const useCases = {
    getProfileById: new GetProfileById(repo),
    createProfile:  new CreateProfile(repo),
    publish: (cmd: any) => bus.publish(cmd),
  };

  // rutas (inyección explícita)
  app.register(profilesRoutes, { prefix: "/api", useCases });

  await app.listen({ port: Number(process.env.PORT || 8080), host: "0.0.0.0" });
})();


