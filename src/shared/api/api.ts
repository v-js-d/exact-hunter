import {
  createApiClient,
  QueryInputType,
  RequestType,
} from './createApiClient';

const {
  instance: $api,
  mutation,
  query,
} = createApiClient({ baseURL: 'api/' }, { withCredentials: true });

export { $api, mutation, query, type QueryInputType, RequestType };
