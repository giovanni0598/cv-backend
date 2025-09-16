export const PerfilSchema = {
    $id: "Perfil",
    type: "object",
    properties: {
      id: { type: "integer" },                 // SERIAL
      nombre: { type: "string", maxLength: 100 },
      titulo: { type: "string", maxLength: 100, nullable: true },
      descripcion: { type: "string", nullable: true },
      ubicacion: { type: "string", maxLength: 100, nullable: true },
      linkedin: { type: "string", maxLength: 255, nullable: true },
      github: { type: "string", maxLength: 255, nullable: true },
      email: { type: "string", maxLength: 255, format: "email", nullable: true },
      avatar_emoji: { type: "string", maxLength: 10, nullable: true },
    },
    required: ["id", "nombre"],   // NOT NULL
  } as const;
  
  export const CreatePerfilSchema = {
    $id: "CreatePerfilInput",
    type: "object",
    properties: {
      nombre: { type: "string", maxLength: 100 },
      titulo: { type: "string", maxLength: 100, nullable: true },
      descripcion: { type: "string", nullable: true },
      ubicacion: { type: "string", maxLength: 100, nullable: true },
      linkedin: { type: "string", maxLength: 255, nullable: true },
      github: { type: "string", maxLength: 255, nullable: true },
      email: { type: "string", maxLength: 255, format: "email", nullable: true },
      avatar_emoji: { type: "string", maxLength: 10, nullable: true },
    },
    required: ["nombre"],   // obligatorio al crear
  } as const;
  
  export const UpdatePerfilSchema = {
    $id: "UpdatePerfilInput",
    type: "object",
    properties: {
      titulo: { type: "string", maxLength: 100, nullable: true },
      descripcion: { type: "string", nullable: true },
      ubicacion: { type: "string", maxLength: 100, nullable: true },
      linkedin: { type: "string", maxLength: 255, nullable: true },
      github: { type: "string", maxLength: 255, nullable: true },
      email: { type: "string", maxLength: 255, format: "email", nullable: true },
      avatar_emoji: { type: "string", maxLength: 10, nullable: true },
    },
    additionalProperties: false,
  } as const;
  