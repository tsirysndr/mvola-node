import { Client, SANDBOX_URL } from "../src";

async function main() {
  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;
  const mvola = new Client(SANDBOX_URL);
  const data = await mvola.auth.generateToken(consumerKey!, consumerSecret!);
  console.log(data);
}

main();
