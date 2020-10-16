import axios from "axios";
import { Auth } from "aws-amplify";

const prod_api = "https://api-dev.localing.uk/api/v1";
const stage_api = "https://api-dev.localing.uk/api/v1";
const dev_api = "https://api-dev.localing.uk/api/v1";

const axiosInstance = axios.create({
    baseURL: (process.env.REACT_APP_BuildENV) ? ((process.env.REACT_APP_BuildENV === "prod") ? prod_api : stage_api) : dev_api,
    responseType: "json"
});

// add token to request header
const axiosRequestInterceptor = async config => {
    try {
        const session = await Auth.currentSession();
        const token = session.accessToken.jwtToken;
        config.headers.Authorization = token ? `Bearer ${token}` : '';
        return config;
    } catch (error) {
        return config;
    }
};
axiosInstance.interceptors.request.use(axiosRequestInterceptor, e => Promise.reject(e));

export default axiosInstance;