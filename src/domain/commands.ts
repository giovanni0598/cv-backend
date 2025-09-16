export type CreateProfileCmd = {
    type: "CREATE_PROFILE";
    payload: Omit<import("./profile").Profile, "id">;
  };
  
  export type UpdateProfileCmd = {
    type: "UPDATE_PROFILE";
    payload: { id: number } & Partial<Omit<import("./profile").Profile, "id">>;
  };
  
  export type DeleteProfileCmd = {
    type: "DELETE_PROFILE";
    payload: { id: number };
  };
  
  export type ProfileCommand = CreateProfileCmd | UpdateProfileCmd | DeleteProfileCmd;
  
  export interface CommandBus {
    publish(cmd: ProfileCommand): Promise<void>;
  }
  