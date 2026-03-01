import { env } from '../config/env';

import {
  createApiClient,
  QueryInputType,
  RequestType,
} from './createApiClient';

const {
  instance: $api,
  mutation,
  query,
} = createApiClient(
  { baseURL: env.NEXT_PUBLIC_API_URL },
  { withCredentials: true },
);

export { $api, mutation, query, type QueryInputType, RequestType };
