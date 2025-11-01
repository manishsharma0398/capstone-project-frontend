import token from "@/utils/token";
import apiFactory from "./apiFactory";

export const authFetcher = apiFactory({
  baseURL: "http://localhost:8000/auth",
  headers: {
    Authorization: token.get() || "GUEST_TOKEN",
  },
});
