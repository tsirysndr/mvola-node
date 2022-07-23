import AuthService from "./Auth";
import TransactionService from "./Transaction";
import axios, { AxiosRequestConfig } from "axios";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

export const SANDBOX_URL = "https://devapi.mvola.mg";
export const PRODUCTION_URL = "https://api.mvola.mg";

class Client {
  transaction: TransactionService;
  auth: AuthService;

  constructor(baseURL: string = SANDBOX_URL, useFetchAdapter: boolean = false) {
    const options: AxiosRequestConfig = { baseURL };
    if (useFetchAdapter) {
      options.adapter = fetchAdapter;
    }
    const client = axios.create(options);
    this.auth = new AuthService(axios.create(options));
    this.transaction = new TransactionService(client);
  }
}

export default Client;
