import mockAxios from "jest-mock-axios";
import { TransactionRequest, TransactionService } from "../src";

const ACCESS_TOKEN =
  "eyJ4NXQiOiJPRE5tWkRFMll6UTRNVEkxTVRZME1tSmhaR00yTUdWa1lUZGhOall5TWpnM01XTmpNalJqWWpnMll6bGpNRGRsWWpZd05ERmhZVGd6WkRoa1lUVm1OZyIsImtpZCI6Ik9ETm1aREUyWXpRNE1USTFNVFkwTW1KaFpHTTJNR1ZrWVRkaE5qWXlNamczTVdOak1qUmpZamcyWXpsak1EZGxZall3TkRGaFlUZ3paRGhrWVRWbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0c2lyeS5zbmRyQGdtYWlsLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IjlCV3pjcmdGRW1FdHJXT1EwRW5FUU1UOEtEZ2EiLCJuYmYiOjE2NTIyMDYzODgsImF6cCI6IjlCV3pjcmdGRW1FdHJXT1EwRW5FUU1UOEtEZ2EiLCJzY29wZSI6IkVYVF9JTlRfTVZPTEFfU0NPUEUiLCJpc3MiOiJodHRwczpcL1wvYXBpbS5wcmVwLnRlbG1hLm1nOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2NTIyMDk5ODgsImlhdCI6MTY1MjIwNjM4OCwianRpIjoiZWI2NWQ2NzgtYmNlYy00Yjg4LWI1MzAtNGM2YmY3ODA4MWU1In0.nx-kk21G1OTofEf0q9Iya_ESTtTJ9Po7AgcV_vV8ROKBAOrAH6HE2ckkK4S9S1WjM0zBQl7e0qtOIYgaN9Oge4BL0ORuvcY5eqammuGAtTku95GzYlDKo0PwQGC_pdbFltKLwnbvA66a8SkXSwiL3OgoC6NRYqmMYF_qQnwF5ZcGVlFnwp-yzLf2ojzgGlHY2o8gDyaEqwThxARmLK5vjcQdv5GoO0h72vrWIfmKZydq1MLQDzLYhSyRZ-q5luoJeTU7tlToIOaBtI-ppTliSTt4TdZi5-5qnLw45wDKGUy5IELs2LSc348JDPq9w7q1Fs2HCH26j7ugw39HZbJ_2Q";

afterEach(() => {
  mockAxios.reset();
});

describe("Merchant Pay", () => {
  it("should get transaction", async () => {
    const expected = require("./fixtures/transaction_details.json");
    const service = new TransactionService(mockAxios.create() as any);
    const transactionId = "636085941";
    const response = await Promise.all([
      service.get(transactionId),
      mockAxios.mockResponse({ data: expected }),
    ]);

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/mvola/mm/transactions/type/merchantpay/1.0.0/${transactionId}`
    );
    expect(response[0]).toEqual(expected);
  });
  it("should get transaction status", async () => {
    const expected = require("./fixtures/transaction_status.json");
    const service = new TransactionService(mockAxios.create() as any);
    const serverCorrelationId = "ec2320b5-3167-4cf0-b2a1-d77e04902360";
    const response = await Promise.all([
      service.getStatus(serverCorrelationId),
      mockAxios.mockResponse({ data: expected }),
    ]);

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/mvola/mm/transactions/type/merchantpay/1.0.0/status/${serverCorrelationId}`
    );
    expect(response[0]).toEqual(expected);
  });
  it("should initiate merchant payment", async () => {
    const expected = require("./fixtures/transaction_response.json");
    const service = new TransactionService(mockAxios.create() as any);

    const correlationId = "5b378ec9-1d22-4b43-b158-16c39e58a1c7";
    service.setAccessToken(ACCESS_TOKEN);
    service.setOptions({
      version: "1.0",
      correlationId,
      userLanguage: "FR",
      userAccountIdentifier: "msisdn;0343500003",
      partnerName: "TestMVola",
    });

    const transactionRef = "13028e6e-5f09-440f-977c-d88331498673";

    const tx: TransactionRequest = {
      amount: 1000,
      currency: "Ar",
      descriptionText: "test",
      requestDate: new Date().toISOString(),
      debitParty: [
        {
          key: "msisdn",
          value: "0343500003",
        },
      ],
      creditParty: [
        {
          key: "msisdn",
          value: "0343500004",
        },
      ],
      metadata: [
        {
          key: "partnerName",
          value: "TestMVola",
        },
        {
          key: "fc",
          value: "USD",
        },
        {
          key: "amountFc",
          value: "1",
        },
      ],
      requestingOrganisationTransactionReference: transactionRef,
      originalTransactionReference: transactionRef,
    };

    const response = await Promise.all([
      service.initMerchantPayment(tx),
      mockAxios.mockResponse({ data: expected }),
    ]);

    expect(mockAxios.post).toHaveBeenCalledWith(
      "/mvola/mm/transactions/type/merchantpay/1.0.0/",
      { ...tx, amount: tx.amount.toString() }
    );
    expect(response[0]).toEqual(expected);
  });
});
