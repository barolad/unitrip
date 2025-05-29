import { createApi } from "@/utils/api";
import { registerGetProfile } from "./get";

export const profileApi = createApi();

registerGetProfile(profileApi);
