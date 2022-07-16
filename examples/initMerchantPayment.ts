import { Client, SANDBOX_URL, TransactionRequest } from "../src";
import { v4 } from "uuid";

async function main() {
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const mvola = new Client(SANDBOX_URL);
  const data = await mvola.auth.generateToken(consumerKey!, consumerSecret!);

  mvola.transaction.setAccessToken(data.access_token);
  mvola.transaction.setOptions({
    version: "1.0",
    correlationId: v4(),
    userLanguage: "FR",
    userAccountIdentifier: "msisdn;0343500003",
    partnerName: "TestMVola",
  });

  const transactionRef = v4();

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
  const response = await mvola.transaction.initMerchantPayment(tx);
  console.log(response);
}

main();
