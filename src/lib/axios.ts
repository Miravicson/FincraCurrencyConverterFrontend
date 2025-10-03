import Axios, { AxiosRequestConfig } from 'axios';
import { LocalStorage } from './local-storage';
import { refreshToken } from '@/_generated';

type ModifiedPromise<T> = Promise<T> & { cancel: () => void };

const baseURL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) ||
  process.env.VITE_API_BASE_URL; // fallback if running in Node context

const createAxiosInstance = () =>
  Axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

let Api = createAxiosInstance();

function setupInterceptors() {
  const refreshAndResetAxiosInstance = async (
    originalRequest: AxiosRequestConfig & { _retry: boolean },
  ) => {
    originalRequest._retry = true;
    try {
      Api = createAxiosInstance(); // overwrite the binding with interceptor already applied so as to not have infite recursion if the refreshToken() errors out with a 401
      const user = await refreshToken(); // now the refreshToken() is making it's request with a fresh new version of axios instance.
      LocalStorage.setAuthUser(user.data);
      return Api(originalRequest);
    } catch (refreshError: any) {
      LocalStorage.removeAuthUser();
      return Promise.reject(refreshError);
    } finally {
      setupInterceptors(); // Setup interceptors for this new axios instance
    }
  };

  const responseErrorInterceptor = async (error: any) => {
    const { config: originalRequest, response } = error;
    console.log(error, 'from response interceptor');
    if (response?.status === 401 && !originalRequest._retry) {
      return await refreshAndResetAxiosInstance(originalRequest);
    }
    return Promise.reject(error);
  };
  Api.interceptors.request.use(
    (request) => request,
    (error) => Promise.reject(error),
  );

  Api.interceptors.response.use(
    (response) => response,
    responseErrorInterceptor,
  );
}
setupInterceptors();

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): ModifiedPromise<T> => {
  const controller = new AbortController();
  const promise = Api({
    ...config,
    ...options,
    signal: controller.signal,
  }).then((value) => value.data) as ModifiedPromise<T>;

  promise.cancel = () => {
    controller.abort();
  };

  return promise;
};
