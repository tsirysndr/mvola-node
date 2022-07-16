import { Service } from "./Service";
import {
  TransactionDetails,
  TransactionRequest,
  TransactionResponse,
  TransactionStatus,
} from "./Types";

class TransactionService extends Service {
  async get(transactionId: string): Promise<TransactionDetails> {
    const { data } = await this.client.get<TransactionDetails>(
      `/mvola/mm/transactions/type/merchantpay/1.0.0/${transactionId}`
    );
    return data;
  }

  async getStatus(serverCorrelationId: string): Promise<TransactionStatus> {
    const { data } = await this.client.get<TransactionStatus>(
      `/mvola/mm/transactions/type/merchantpay/1.0.0/status/${serverCorrelationId}`
    );
    return data;
  }

  // DEPRECATED
  async sendPayment(params: TransactionRequest): Promise<TransactionResponse> {
    const { data } = await this.client.post<TransactionResponse>(
      "/mvola/mm/transactions/type/merchantpay/1.0.0/",
      { ...params, amount: params.amount.toString() }
    );
    return data;
  }

  async initMerchantPayment(params: TransactionRequest): Promise<TransactionResponse> {
    return this.sendPayment(params);
  }
}

export default TransactionService;
