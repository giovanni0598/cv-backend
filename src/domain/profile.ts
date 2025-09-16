export type Profile = {
    id: number;
    nombre: string;
    titulo?: string | null;
    descripcion?: string | null;
    ubicacion?: string | null;
    linkedin?: string | null;
    github?: string | null;
    email?: string | null;
    avatar_emoji?: string | null;
  };
  
  export interface ProfileRepository {
    CreatePerfil(profile: Profile): Profile | PromiseLike<Profile | null> | null;
    getById(id: number): Promise<Profile | null>;
  }
  