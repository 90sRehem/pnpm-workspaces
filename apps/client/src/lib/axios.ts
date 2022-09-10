import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_URL } from "@/config";
import { storage } from "@/utils";

export * from "axios";

let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}[] = [];

function getFromStorage(key: string): {
  data: any;
  type?: "local" | "session";
} {
  const localValues = storage.getItem({ key, storageType: "local" });
  const sessionValues = storage.getItem({ key, storageType: "session" });

  if (localValues) {
    return {
      data: { ...localValues },
      type: "local",
    };
  }
  if (sessionValues) {
    return {
      data: { ...sessionValues },
      type: "session",
    };
  }

  return { data: null };
}

function authRequestInterceptor(config: AxiosRequestConfig) {
  const storagedValue = getFromStorage("user");

  if (storagedValue.data) {
    config.headers.Authorization = `Bearer ${storagedValue.data.token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL || "http://localhost:3333/api",
});

axios.interceptors.request.use(authRequestInterceptor, error => {
  Promise.reject(error);
});

axios.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error.response?.status === 401) {
      if (error.response.data.error === "token-expired") {
        const originalConfig = error.config;
        const { data, type } = getFromStorage("user");

        if (!isRefreshing) {
          isRefreshing = true;
          axios
            .post("/v1/session/refresh", {
              refreshToken: data.refreshToken,
              userId: data.id,
            })
            .then(response => {
              const returnedData = response.data.data;

              if (type === "local") {
                storage.setItem({
                  key: "user",
                  values: returnedData,
                  storageType: "local",
                });
              } else if (type === "session") {
                storage.setItem({
                  key: "user",
                  values: returnedData,
                  storageType: "session",
                });
              }

              axios.defaults.headers.Authorization = `Bearer ${returnedData.token}`;
              failedRequestsQueue.forEach(request =>
                request.onSuccess(returnedData.token),
              );
              failedRequestsQueue = [];
            })
            .catch(error => {
              failedRequestsQueue.forEach(request => request.onFailure(error));
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`;
              resolve(axios(originalConfig));
            },
            // eslint-disable-next-line no-shadow
            onFailure: error => {
              reject(error);
            },
          });
        });
      }

      return Promise.reject(new Error("Error with auth token"));
    }
    if (error) {
      // const message = error.response?.data?.message || error.message;
      // useNotificationStore
      //   .getState()
      //   .addNotification({ type: 'error', title: 'Erro', message });
    }
    if (error.code === "ERR_NETWORK") {
    }
    return Promise.reject(error);
  },
);
export * from "axios";
