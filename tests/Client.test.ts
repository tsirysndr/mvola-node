import { AuthService, Client, SANDBOX_URL, TransactionService } from "../src";

describe("Client", () => {
  it("should return client instance", () => {
    const client = new Client(SANDBOX_URL);
    expect(client.auth).toBeInstanceOf(AuthService);
    expect(client.transaction).toBeInstanceOf(TransactionService);
  });
});
