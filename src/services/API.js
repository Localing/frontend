import axios from "axios";
import { Auth } from "aws-amplify";

const axiosInstance = axios.create({
    baseURL: "https://api-dev.localing.uk/api/v1",
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