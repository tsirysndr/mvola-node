import { Service } from "./Service";
import { TransactionRequest } from "./Types";

class TransactionService extends Service {
  async get(transactionId: string) {
    const { data } = await this.client.get(
      `/mvola/mm/transactions/type/merchantpay/1.0.0/${transactionId}`
    );
    return data;
  }

  async getStatus(serverCorrelationId: string) {
    const { data } = await this.client.get(
      `/mvola/mm/transactions/type/merchantpay/1.0.0/status/${serverCorrelationId}`
    );
    return data;
  }

  async sendPayment(params: TransactionRequest) {
    const { data } = await this.client.post(
      "/mvola/mm/transactions/type/merchantpay/1.0.0/",
      { ...params, amount: params.amount.toString() }
    );
    return data;
  }
}

export default TransactionService;
