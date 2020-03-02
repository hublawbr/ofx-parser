import {
  OfxInvestmentBuyMfTransaction,
  OfxInvestmentBuyOtherTransaction,
  OfxInvestmentIncomeTransaction,
  OfxInvestmentTransactionList
} from './ofx-body';
import { TransactionModel } from '../transaction.model';
import { OfxDateUtil } from './ofx-date.util';
import { OfxStatementTransactionAdapter } from './ofx-statement-transaction.adapter';

export class OfxInvestmentTransactionAdapter {
  public static convertBuyOtherToInvestmentTransaction(
    trans: OfxInvestmentBuyOtherTransaction
  ): TransactionModel {
    return {
      transactionType: 'BUYOTHER',
      amount: parseFloat(trans.INVBUY.TOTAL),
      fitId: trans.INVBUY.INVTRAN.FITID,
      name: undefined,
      memo: trans.INVBUY.INVTRAN.MEMO,
      dateTrade: OfxDateUtil.OfxDateToDate(trans.INVBUY.INVTRAN.DTTRADE),
      dateSettle: OfxDateUtil.OfxDateToDate(trans.INVBUY.INVTRAN.DTSETTLE),
      correctFitId: trans.INVBUY.INVTRAN.REVERSALFITID,
      price: parseFloat(trans.INVBUY.UNITPRICE),
      quantity: parseFloat(trans.INVBUY.UNITS),
      secId: trans.INVBUY.SECID.UNIQUEID
    };
  }

  public static convertBuyMfToInvestmentTransaction(
    trans: OfxInvestmentBuyMfTransaction
  ): TransactionModel {
    return {
      transactionType: 'BUYMF',
      amount: parseFloat(trans.INVBUY.TOTAL),
      fitId: trans.INVBUY.INVTRAN.FITID,
      name: undefined,
      memo: trans.INVBUY.INVTRAN.MEMO,
      dateTrade: OfxDateUtil.OfxDateToDate(trans.INVBUY.INVTRAN.DTTRADE),
      dateSettle: OfxDateUtil.OfxDateToDate(trans.INVBUY.INVTRAN.DTSETTLE),
      correctFitId: trans.INVBUY.INVTRAN.REVERSALFITID,
      price: parseFloat(trans.INVBUY.UNITPRICE),
      quantity: parseFloat(trans.INVBUY.UNITS),
      secId: trans.INVBUY.SECID.UNIQUEID
    };
  }

  public static convertIncomeToInvestmentTransaction(
    trans: OfxInvestmentIncomeTransaction
  ): TransactionModel {
    return {
      transactionType: trans.INCOMETYPE,
      amount: parseFloat(trans.TOTAL),
      fitId: trans.INVTRAN.FITID,
      name: undefined,
      memo: trans.INVTRAN.MEMO,
      dateTrade: OfxDateUtil.OfxDateToDate(trans.INVTRAN.DTTRADE),
      dateSettle: OfxDateUtil.OfxDateToDate(trans.INVTRAN.DTSETTLE),
      correctFitId: trans.INVTRAN.REVERSALFITID,
      secId: trans.SECID.UNIQUEID
    };
  }

  public static convertTransactionList(
    transList: OfxInvestmentTransactionList
  ): TransactionModel[] {
    const transactions: TransactionModel[] = [];
    if (transList.INVBANKTRAN) {
      for (let i = 0; i < transList.INVBANKTRAN.length; i++) {
        transactions.push(
          OfxStatementTransactionAdapter.convertToTransaction(
            transList.INVBANKTRAN[i].STMTTRN
          )
        );
      }
    }

    if (transList.BUYOTHER) {
      for (let i = 0; i < transList.BUYOTHER.length; i++) {
        transactions.push(
          OfxInvestmentTransactionAdapter.convertBuyOtherToInvestmentTransaction(
            transList.BUYOTHER[i]
          )
        );
      }
    }

    if (transList.BUYMF) {
      for (let i = 0; i < transList.BUYMF.length; i++) {
        transactions.push(
          OfxInvestmentTransactionAdapter.convertBuyMfToInvestmentTransaction(
            transList.BUYMF[i]
          )
        );
      }
    }

    if (transList.INCOME) {
      for (let i = 0; i < transList.INCOME.length; i++) {
        transactions.push(
          OfxInvestmentTransactionAdapter.convertIncomeToInvestmentTransaction(
            transList.INCOME[i]
          )
        );
      }
    }

    return transactions;
  }
}
