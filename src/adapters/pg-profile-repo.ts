import { Pool } from "pg";
import { Profile, ProfileRepository } from "../domain/profile";

export class PgProfileRepository implements ProfileRepository {
  constructor(private readonly pool: Pool) {}

  async getById(id: number): Promise<Profile | null> {
    const { rows } = await this.pool.query(
      `SELECT id, nombre, titulo, descripcion, ubicacion, linkedin, github, email, avatar_emoji
       FROM perfil WHERE id = $1`, [id]
    );
    return rows[0] ?? null;
  }

  async CreatePerfil(profile: Profile): Promise<Profile | null> {
    const { rows } = await this.pool.query(
      `INSERT INTO perfil (nombre, titulo, descripcion, ubicacion, linkedin, github, email, avatar_emoji) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [profile.nombre, profile.titulo, profile.descripcion, profile.ubicacion, profile.linkedin, profile.github, profile.email, profile.avatar_emoji]
    );
    return rows[0] ?? null;
  }
}
