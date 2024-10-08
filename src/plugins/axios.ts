import Vue, { PluginObject } from 'vue';
import axios from 'axios';
import router from '../router';

// Full config:  https://github.com/axios/axios#request-config
const config = {
  baseURL: `${process.env.VUE_APP_BASE_API}`,
  timeout: 60 * 1000,
  withCredentials: false,
  port: 3000,
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  (cfg: any) => {
    const token = localStorage.getItem('token') || '';
    if (token) {
      cfg = {...cfg, ...{headers: {Authorization: `Bearer ${token}`}}};
    }
    return cfg;
  },
  (err: any) => {
    return Promise.reject(err);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res) => {
    return res.data as Response;
  },
  async (err: { response: { status: number; }; }) => {
    // fazer logout
    if (err.response.status === 401) {
      try {
        router.push({ name: 'Home', replace: true });
      } finally {
        await localStorage.setItem('token', '');
      }
    }
    return Promise.reject(err);
  },
);

const Plugin: PluginObject<any> = {
  install: (vue) => {
    vue.$axios = axiosInstance;
  },
};

Plugin.install = (vue) => {
  vue.$axios = axiosInstance;
  window.axios = axiosInstance;
  Object.defineProperties(Vue.prototype, {
    $axios: {
      get() {
        return axiosInstance;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
