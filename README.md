<h1 align="left">MVola Node.js Library</h1>
<p>
  <a href="https://app.travis-ci.com/github/tsirysndr/mvola-node" target="_blank">
    <img src="https://app.travis-ci.com/tsirysndr/mvola-node.svg?branch=master" />
  </a>
  <a href="https://codecov.io/gh/tsirysndr/mvola-node" target="_blank">
    <img src="https://codecov.io/gh/tsirysndr/mvola-node/branch/master/graph/badge.svg?token=" />
  </a>
  <a href="https://www.npmjs.com/package/mvola" target="_blank">
  <img alt="Version" src="https://img.shields.io/badge/version-1.2.0-cyan.svg?cacheSeconds=2592000" />
  </a>
  <a href="https://github.com/tsirysndr/mvola-node#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/tsirysndr/mvola-node/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/tsirysndr/mvola-node/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg" />
  </a>
</p>

The MVola Node library provides convenient access to the [MVola API](https://www.mvola.mg/devportal) from applications written in server-side Javascript 

## 🚚 Install

```sh
yarn add mvola
```

## 🚀 Usage

```typescript
import { Client, SANDBOX_URL, TransactionRequest } from "mvola";
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
    userAccountIdentifier: "msisdn;0343500004",
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

```

## Author

👤 **Tsiry Sandratraina <tsiry.sndr@aol.com>**

* Twitter: [@tsiry_sndr](https://twitter.com/tsiry_sndr)
* Github: [@tsirysndr](https://github.com/tsirysndr)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/tsirysndr/mvola-node/issues). You can also take a look at the [contributing guide](https://github.com/tsirysndr/mvola-node/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Tsiry Sandratraina <tsiry.sndr@aol.com>](https://github.com/tsirysndr).<br />
This project is [MIT](https://github.com/tsirysndr/mvola-node/blob/master/LICENSE) licensed.

