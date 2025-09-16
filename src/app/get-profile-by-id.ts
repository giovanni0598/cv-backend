import { Profile, ProfileRepository } from "../domain/profile";

export class GetProfileById {
  constructor(private readonly repo: ProfileRepository) {}
  async exec(id: number): Promise<Profile | null> {
    return this.repo.getById(id);
  }
}
