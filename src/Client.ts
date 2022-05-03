import AuthService from "./Auth";
import TransactionService from "./Transaction";
import axios from "axios";

export const SANDBOX_URL = "https://devapi.mvola.mg";
export const PRODUCTION_URL = "https://api.mvola.mg";

class Client {
  transaction: TransactionService;
  auth: AuthService;

  constructor(baseURL: string = SANDBOX_URL) {
    const client = axios.create({ baseURL });
    this.auth = new AuthService(axios.create({ baseURL }));
    this.transaction = new TransactionService(client);
  }
}

export default Client;
