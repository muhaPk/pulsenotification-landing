export type LoadDataParams = {
  api: string;
  params?: any;
  isExternal?: boolean;
  method?: string;
  isRefreshing?: boolean;
  dataCallback?(data: any): void;
  loader?(loading: boolean): void;
  headers?: { [key: string]: string };
};

export type TGenericGet = {
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  data: any;
  loadData(options: LoadDataParams): Promise<void>;
};
