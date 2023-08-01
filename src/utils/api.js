import axios from "axios";

export const api = axios.create({
    baseURL: "https://tes-mobile.landa.id/api",
});
