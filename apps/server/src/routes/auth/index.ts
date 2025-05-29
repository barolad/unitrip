import { createApi } from "@/utils/api";
import { registerSendOtp } from "./send-otp/post";
import { registerVerifyOtp } from "./verify-otp/post";

export const authApi = createApi();

registerSendOtp(authApi);
registerVerifyOtp(authApi);
