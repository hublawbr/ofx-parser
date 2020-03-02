import { OfxDateUtil } from './ofx-date.util';
import { TransactionModel } from '../transaction.model';
import { OfxStatementTransaction } from './ofx-body';

export class OfxStatementTransactionAdapter {
  public static convertToTransaction(
    trans: OfxStatementTransaction
  ): TransactionModel {
    let payee;
    if (trans.PAYEE) {
      payee = {
        name: trans.PAYEE.NAME
      };
    }
    return {
      transactionType: trans.TRNTYPE,
      amount: parseFloat(trans.TRNAMT),
      fitId: trans.FITID,
      name: trans.NAME,
      memo: trans.MEMO,
      payee: payee,
      extendedName: trans.EXTDNAME,
      datePosted: OfxDateUtil.OfxDateToDate(trans.DTPOSTED),
      dateAvailable: OfxDateUtil.OfxDateToDate(trans.DTAVAIL),
      checkNumber: trans.CHECKNUM,
      refNumber: trans.REFNUM,
      correctFitId: trans.CORRECTFITID,
      correctAction: trans.CORRECTACTION,
      serverTransactionId: trans.SRVRTID,
      imageData: trans.IMAGEDATA
    };
  }
  public static convertTransactionList(
    transList: OfxStatementTransaction[]
  ): TransactionModel[] {
    if (!transList) {
      return [];
    }
    const transactions: TransactionModel[] = [];
    if (Array.isArray(transList)) {
      for (let i = 0; i < transList.length; i++) {
        transactions.push(
          OfxStatementTransactionAdapter.convertToTransaction(transList[i])
        );
      }
    } else {
      transactions.push(
        OfxStatementTransactionAdapter.convertToTransaction(transList)
      );
    }

    return transactions;
  }
}
