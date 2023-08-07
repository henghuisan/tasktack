import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
// import { AxiosResponse, AxiosRequestConfig } from "axios";
import JwtService from "./JwtService";

class ApiService {
    public static init(baseURL: string) {
        // axios.defaults.baseURL = baseURL;
        axios.defaults.baseURL = "http://localhost:8000/api/";
        axios.defaults.headers.common["Accept"] =
            "application/json";
    }

    public static setAuthorizationHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`;
    }

    public static get(resource: string,
        slug = "" as string): Promise<AxiosResponse> {
        return axios.get(`${resource}/${slug}`);
    }

public static post(resource: string,
        params: any): Promise<AxiosResponse> {
        return axios.post(`${resource}`, params);
    }

    public static put(resource: string,
        params: AxiosRequestConfig): Promise<AxiosResponse> {
        return axios.put(`${resource}`, params);
    }

    public static delete(resource: string
    ): Promise<AxiosResponse> {
        return axios.post(resource);
    }
}

export default ApiService;