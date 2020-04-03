import { OfxCreditCardAccount } from './ofx-body';
import { AccountModel } from '../account.model';

export class OfxCreditCardAccountAdapter {
  public static convertToAccount(
    accountInfo: OfxCreditCardAccount
  ): AccountModel {
    return {
      accountId: accountInfo.CCACCTINFO.CCACCTFROM.ACCTID,
      serviceStatus: accountInfo.CCACCTINFO.SVCSTATUS,
      ofxAccountType: accountInfo.CCACCTINFO.CCACCTFROM.ACCTTYPE,
      bankId: accountInfo.CCACCTINFO.CCACCTFROM.BANKID
    };
  }
}
