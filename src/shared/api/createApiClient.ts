import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export enum RequestType {
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PATCH',
}

export type QueryInputType<T> = {
  urlParams?: string[];
  requestParams?: T;
};

export type ApiClient = {
  instance: AxiosInstance;
  mutation: <Input, Output>(
    type?: RequestType,
  ) => (
    url: string,
    { arg }: Readonly<{ arg: Input }>,
  ) => Promise<AxiosResponse<Output>>;
  query: <Params, Output>(
    input?: Readonly<QueryInputType<Params>> | null,
    options?: AxiosRequestConfig,
  ) => (url: string) => Promise<AxiosResponse<Output>>;
};

export const createApiClient = (
  config: AxiosRequestConfig = {},
  defaultOptions?: { withCredentials?: boolean },
): ApiClient => {
  const instance = axios.create({
    ...config,
    withCredentials: defaultOptions?.withCredentials ?? true,
  });

  const mutation =
    <InputType, OutputType>(requestType?: RequestType) =>
    async (
      url: string,
      { arg }: Readonly<{ arg: InputType }>,
    ): Promise<AxiosResponse<OutputType>> => {
      switch (requestType) {
        case RequestType.Delete: {
          return instance.delete(url, { data: arg });
        }
        case RequestType.Patch: {
          return instance.patch(url, arg);
        }
        case RequestType.Put: {
          return instance.put(url, arg);
        }
        default: {
          return instance.post(url, arg);
        }
      }
    };

  const query =
    <T, OutputType>(
      input?: Readonly<QueryInputType<T>> | null,
      options?: AxiosRequestConfig,
    ) =>
    async (url: string): Promise<AxiosResponse<OutputType>> => {
      const params = input?.requestParams ?? null;
      const urlParams = input?.urlParams?.join('/');
      return instance.get(`${url}${urlParams ? `/${urlParams}` : ''}`, {
        ...options,
        params,
      });
    };

  return { instance, mutation, query };
};
