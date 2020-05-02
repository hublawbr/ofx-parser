import { OfxDateUtil } from './ofx-date.util';
import { OfxStatementTransactionList } from './ofx-body';
// import { AccountBalanceModel } from '../account-balance.model';

export class OfxStatementDateAdapter {
  public static convertStatementDate(
    transactionsList: OfxStatementTransactionList
  ): any {
    return {
      // statementDate.start = body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.DTSTART
      // statementDate.end = body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.DTEND
      start: OfxDateUtil.OfxDateToDate(transactionsList.DTSTART),
      end: OfxDateUtil.OfxDateToDate(transactionsList.DTEND)
    };
  }
}
