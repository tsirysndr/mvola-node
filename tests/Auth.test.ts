import mockAxios from "jest-mock-axios";
import { AuthService } from "../src";

afterEach(() => {
  mockAxios.reset();
});

describe("Authenticate", () => {
  it("should return access token", async () => {
    const expected = require("./fixtures/auth_response.json");
    const auth = new AuthService(mockAxios.create() as any);
    const response = await Promise.all([
      auth.generateToken("consumerKey", "consumerSecret"),
      mockAxios.mockResponse({ data: expected }),
    ]);

    expect(mockAxios.post).toHaveBeenCalledWith(
      "/token",
      "grant_type=client_credentials&scope=EXT_INT_MVOLA_SCOPE",
      {
        headers: {
          Authorization: "Basic Y29uc3VtZXJLZXk6Y29uc3VtZXJTZWNyZXQ=",
        },
      }
    );
    expect(response[0].access_token).toBeDefined();
    expect(response[0].expires_in).toBeDefined();
    expect(response[0].token_type).toBeDefined();
    expect(response[0].scope).toBeDefined();
    expect(response[0]).toEqual(expected);
  });
});
