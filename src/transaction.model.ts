export interface TransactionModel {
  fitId: string;
  datePosted?: Date;
  dateAvailable?: Date;
  amount: number;
  transactionType: string;
  name: string;
  payee?: PayeeModel;
  extendedName?: string;
  checkNumber?: string;
  refNumber?: string;
  memo?: string;
  correctFitId?: string;
  correctAction?: string;
  // Investment
  quantity?: number;
  price?: number;
  action?: string;
  commission?: number;
  secId?: string;
  serverTransactionId?: string;
  imageData?: any;
  dateTrade?: Date;
  dateSettle?: Date;
}

export interface PayeeModel {
  name: string;
}
