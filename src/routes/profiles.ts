import { FastifyInstance } from "fastify";
import { PerfilSchema, CreatePerfilSchema, UpdatePerfilSchema } from "../schemas/profiles";
import { GetProfileById } from "../app/get-profile-by-id";
import { CreateProfile } from "../app/create-profile";
import { UpdateProfileCmd, DeleteProfileCmd } from "../domain/commands";

export default async function profilesRoutes(
  fastify: FastifyInstance,
  opts: {
    useCases: {
      getProfileById: GetProfileById;
      createProfile: CreateProfile;
      publish: (cmd: UpdateProfileCmd | DeleteProfileCmd) => Promise<void>;
    };
  }
) {
  const { getProfileById, createProfile, publish } = opts.useCases;

  fastify.addSchema(PerfilSchema);
  fastify.addSchema(CreatePerfilSchema);
  fastify.addSchema(UpdatePerfilSchema);

  // GET (read directa)
  fastify.get("/profiles/:id", {
    schema: {
      tags: ["Profiles"],
      params: { type: "object", required: ["id"], properties: { id: { type: "integer" } } },
      response: { 200: { $ref: "Perfil#" }, 404: { type: "object", properties: { message: { type: "string" } } } },
    },
  }, async (req, res) => {
    const { id } = req.params as { id: number };
    const p = await getProfileById.exec(id);
    if (!p) return res.code(404).send({ message: "Perfil no encontrado" });
    return p;
  });

  // POST (write → comando)
  fastify.post("/profiles", {
    schema: {
      tags: ["Profiles"],
      body: { $ref: "CreatePerfilInput#" },
      response: { 202: { type: "object", properties: { status: { type: "string" } } } },
    },
  }, async (req, res) => {
    await createProfile.exec(req.body as any);
    return res.code(202).send({ status: "queued" });
  });

  // PUT (write → comando)
  fastify.put("/profiles/:id", {
    schema: { tags: ["Profiles"], body: { $ref: "UpdatePerfilInput#" }, response: { 202: { type: "object", properties: { status: { type: "string" } } } } },
  }, async (req, res) => {
    const { id } = req.params as { id: number };
    await publish({ type: "UPDATE_PROFILE", payload: { id, ...(req.body as any) } });
    return res.code(202).send({ status: "queued" });
  });

  // DELETE (write → comando)
  fastify.delete("/profiles/:id", {
    schema: { tags: ["Profiles"], response: { 202: { type: "object", properties: { status: { type: "string" } } } } },
  }, async (req, res) => {
    const { id } = req.params as { id: number };
    await publish({ type: "DELETE_PROFILE", payload: { id } });
    return res.code(202).send({ status: "queued" });
  });
}
