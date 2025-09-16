import { Profile, ProfileRepository } from "../domain/profile";

export class CreateProfile {
  constructor(private readonly repo: ProfileRepository) {}
  async exec(profile: Profile): Promise<Profile | null> {
    return this.repo.CreatePerfil(profile);
  }
}
