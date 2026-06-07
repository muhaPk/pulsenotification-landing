import { useCallback } from "react";
import axios from "axios";
import { API_CONFIG } from '@/config/config';

type TParams = {
  api: string;
  methodName?: string;
  loader?: (loading: boolean) => void;
  successHandler?: Function;
  errorHandler?: Function;
  params?: Object;
  data?: Object;
  isExternal?: boolean;
  type?: "form-data";
  headers?: { [key: string]: string };
};

const baseConfig = {
  baseURL: API_CONFIG.BASE_URL,
};

export function useAxios() {
  const get = useCallback(async (options: TParams): Promise<any> => {
    const { api, loader, successHandler, isExternal, errorHandler, params, headers } = options;

    if (loader) loader(true);

    try {
      const response = await axios({
        ...baseConfig,
        method: "get",
        headers: { "Content-Type": "application/json", ...headers },
        url: isExternal ? api : `${baseConfig.baseURL}${api}`,
        params,
      });

      if (successHandler) successHandler(response.data);
    } catch (error: any) {
      if (errorHandler) {
        errorHandler(error?.response?.data || "An unknown error occurred");
      }
    } finally {
      if (loader) loader(false);
    }
  }, []);

  const set = useCallback(async (options: TParams): Promise<any> => {
    const { api, loader, successHandler, errorHandler, params, data, methodName, type, headers } = options;

    if (loader) loader(true);

    try {
      const requestHeaders: any = {};

      if (type === "form-data") {
        requestHeaders["Content-Type"] = "multipart/form-data";
      } else {
        requestHeaders["Content-Type"] = "application/json";
      }

      Object.assign(requestHeaders, headers);

      const response = await axios({
        ...baseConfig,
        headers: requestHeaders,
        method: methodName,
        url: `${baseConfig.baseURL}${api}`,
        data,
        params,
        timeout: 300000,
      });

      if (successHandler) successHandler(response.data);
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";

      if (error?.response?.status === 413) {
        errorMessage = "File too large. Please select a smaller file.";
      } else if (error?.response?.status) {
        errorMessage = error?.response?.data?.message || `Server error: ${error.response.status}`;
      } else if (error?.code === 'ECONNABORTED' || error?.message?.includes('timeout')) {
        errorMessage = "Upload timed out.";
      } else if (error?.message?.includes('Network Error')) {
        errorMessage = "Network connection lost.";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      if (errorHandler) {
        errorHandler({ message: errorMessage, statusCode: error?.response?.status, originalError: error });
      }
    } finally {
      if (loader) loader(false);
    }
  }, []);

  return { get, set };
}
