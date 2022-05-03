import { AxiosInstance } from "axios";
import { Options } from "./Types";

export class Service {
  protected client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  setAccessToken(accessToken: string): void {
    this.client.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
  }

  setOptions(options: Options): void {
    this.client.defaults.headers.common["Version"] = options.version;
    this.client.defaults.headers.common["X-CorrelationID"] =
      options.correlationId;
    if (options.userLanguage) {
      this.client.defaults.headers.common["UserLanguage"] =
        options.userLanguage;
    }
    this.client.defaults.headers.common["UserAccountIdentifier"] =
      options.userAccountIdentifier;
    if (options.partnerName) {
      this.client.defaults.headers.common["PartnerName"] = options.partnerName;
    }
    if (options.callbackUrl) {
      this.client.defaults.headers.common["X-Callback-URL"] =
        options.callbackUrl;
    }
    this.client.defaults.headers.common["Cache-Control"] = "no-cache";
  }
}
