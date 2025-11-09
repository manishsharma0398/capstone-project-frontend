import token from "@/utils/token";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

/**
 * Logs out the current user.
 * @returns {void}
 */
const logoutUser = (): void => {
  window.location.href = "/auth/logout?reason=expired";
};

/**
 * Determines the origin of the log (client or server).
 * @returns {'client' | 'server'} The origin of the log.
 */
const getLogOrigin = (): "client" | "server" =>
  typeof window !== "undefined" ? "client" : "server";

/**
 * Creates an Axios instance with interceptors for JWT expiration and logout handling.
 * @param {ApiFactoryConfig} config Optional configuration for the Axios instance.
 * @returns {AxiosInstance} Configured Axios instance with request and response interceptors.
 */
const apiFactory = ({
  baseURL,
  headers = {},
  timeout = 9000,
  responseType = "json",
  responseEncoding = "utf8",
  ...rest
}: AxiosRequestConfig = {}): AxiosInstance => {
  // Create an Axios instance with the provided configuration
  const instance = axios.create({
    baseURL,
    headers,
    timeout,
    responseType,
    responseEncoding,
    ...rest,
  });

  // Add request and response interceptors to handle JWT expiration and logout
  instance.interceptors.request.use(
    (config) => {
      const currentToken = token.get();
      config.headers = config.headers || {};
      config.headers.Authorization = currentToken
        ? `Bearer ${currentToken}`
        : "GUEST_TOKEN";
      return config;
    },
    (err: AxiosError) => Promise.reject(err)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (err: AxiosError) => {
      const isTokenExpired = token.isExpired();
      // Check if the error is due to JWT expiration or unauthorized access
      if ((err.response && err.response.status === 403) || isTokenExpired) {
        const method = err.config?.method?.toUpperCase() || "UNKNOWN_METHOD";
        const url = err.config?.url || "UNKNOWN_URL";
        const message = isTokenExpired
          ? "JWT token is expired. Logging out the user..."
          : `Received 403 Forbidden response for ${method} ${url}. Logging out the user....`;

        console.error(
          message,
          {
            method,
            url,
          },
          "api-factory-interceptor",
          getLogOrigin()
        );

        if (isTokenExpired) logoutUser();
      }

      return Promise.reject(err);
    }
  );

  // Return the configured and intercepted Axios instance
  return instance;
};

export default apiFactory;
