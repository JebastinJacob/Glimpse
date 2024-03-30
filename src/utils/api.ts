import axios, {
  AxiosInstance,
  AxiosInterceptorOptions,
  AxiosResponse,
} from 'axios';

//add key here
const bearer = '';
const url = 'https://newsapi.org/v2/';
const api: AxiosInstance = axios.create({
  baseURL: url,
});

// Request interceptor (optional)
api.interceptors.request.use(
  config => {
    // Do something with successful responses (optional)
    config.headers.Authorization = `Bearer ${bearer}`;
    return config; // Return only the data part
  },
  error => {
    // Do something with response errors (optional)
    console.error('Response error:', error);
    return Promise.reject(error);
  },
);
// Response interceptor (optional)
api.interceptors.response.use(
  response => {
    // Do something with successful responses (optional)
    return response.data; // Return only the data part
  },
  error => {
    // Do something with response errors (optional)
    console.error('Response error:', error);
    return Promise.reject(error);
  },
);

// Helper functions for each HTTP method
const get = async <T>(url: string, params?: object): Promise<T> => {
  const response: any = await api.get<T>(url, {params});
  return response;
};

const post = async <T>(url: string, data?: object): Promise<T> => {
  const response: any = await api.post<T>(url, data);
  return response;
};

const put = async <T>(url: string, data?: object): Promise<T> => {
  const response: any = await api.put<T>(url, data);
  return response;
};

const del = async <T>(url: string): Promise<T> => {
  const response: any = await api.delete<T>(url);
  return response;
};

export default {get, post, put, del};
