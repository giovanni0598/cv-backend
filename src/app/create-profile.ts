import { Profile, ProfileRepository } from "../domain/profile";

export class CreateProfile {
  constructor(private readonly repo: ProfileRepository) {}
  async exec(id: number): Promise<Profile | null> {
    return this.repo.getById(id);
  }
}
