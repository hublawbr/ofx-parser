export interface TransactionModel {
  // Principais campos
  transactionType?: string;
  amount?: number;
  fitId?: string;
  memo?: string;
  datePosted?: Date;
  refNumber?: string;
  checkNumber?: string;

  // specific
  name?: string;
  dateAvailable?: Date;
  payee?: PayeeModel;
  extendedName?: string;
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
