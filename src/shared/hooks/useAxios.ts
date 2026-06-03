import axios from 'axios';
import { useCallback } from 'react';
import { API_CONFIG } from '../../config/config';

type TParams = {
  api: string;
  methodName?: string;
  loader?: (loading: boolean) => void;
  successHandler?: Function;
  errorHandler?: Function;
  params?: Object;
  data?: Object;
  isExternal?: boolean;
  headers?: { [key: string]: string };
};

const getConfig = {
  baseURL: API_CONFIG.BASE_URL,
  method: 'get',
};

export function useAxios() {
  const get = useCallback(async (options: TParams): Promise<any> => {
    const { api, loader, successHandler, isExternal, errorHandler, params, headers } = options;

    if (loader) loader(true);

    try {
      const response = await axios({
        ...getConfig,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        url: isExternal ? api : `${getConfig.baseURL}${api}`,
        params,
      });

      if (successHandler) successHandler(response.data);
    } catch (error: any) {
      if (errorHandler) {
        errorHandler(error?.response?.data || 'An unknown error occurred');
      }
    } finally {
      if (loader) loader(false);
    }
  }, []);

  return { get };
}
