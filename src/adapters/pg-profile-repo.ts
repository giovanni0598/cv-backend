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
}
