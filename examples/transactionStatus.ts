import { Client, SANDBOX_URL } from "../src";
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

  const response = await mvola.transaction.getStatus(
    "2ba1d66a-25cf-4c12-8a6f-4cb01255148e"
  );
  console.log(response);
}

main();
