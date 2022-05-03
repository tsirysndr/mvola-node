import qs from "qs";
import { Service } from "./Service";
import { AuthResponse } from "./Types";

class AuthService extends Service {
  async generateToken(
    consumerKey: string,
    consumerSecret: string
  ): Promise<AuthResponse> {
    const params = qs.stringify({
      grant_type: "client_credentials",
      scope: "EXT_INT_MVOLA_SCOPE",
    });

    const { data } = await this.client.post<AuthResponse>("/token", params, {
      headers: {
        Authorization: `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`,
      },
    });

    return data;
  }
}

export default AuthService;
