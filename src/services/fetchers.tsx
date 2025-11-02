import token from "@/utils/token";
import apiFactory from "./apiFactory";

export const commonFetcher = apiFactory({
  baseURL: "http://localhost:8000",
});

export const authFetcher = apiFactory({
  baseURL: "http://localhost:8000/auth",
  headers: {
    Authorization: token.get() || "GUEST_TOKEN",
  },
});

export const listingsFetcher = apiFactory({
  baseURL: "http://localhost:8000/listings",
  headers: {
    Authorization: token.get() || "GUEST_TOKEN",
  },
});

export const skillsFetcher = apiFactory({
  baseURL: "http://localhost:8000/skill",
  headers: {
    Authorization: token.get() || "GUEST_TOKEN",
  },
});

export const mediaFetcher = apiFactory({
  baseURL: "http://localhost:8000/media",
  headers: {
    Authorization: token.get() || "GUEST_TOKEN",
  },
});
