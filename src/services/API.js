import axios from "axios";

export default axios.create({
    baseURL: "https://consumerapi.dev.localing.co.uk",
    responseType: "json"
});