import { OfxInvestmentAccount } from './ofx-body';
import { AccountModel } from '../account.model';

export class OfxInvestmentAccountAdapter {
  public static convertToAccount(
    accountInfo: OfxInvestmentAccount
  ): AccountModel {
    return {
      accountId: accountInfo.INVACCTINFO.INVACCTFROM.ACCTID,
      accountType: 'INVESTMENT',
      ofxAccountType: 'INVESTMENT',
      serviceStatus: accountInfo.INVACCTINFO.SVCSTATUS,
      brokerId: accountInfo.INVACCTINFO.INVACCTFROM.BROKERID
    };
  }
}
