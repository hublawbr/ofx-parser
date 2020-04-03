import { AccountModel } from '../account.model';
import { OfxBankAccount, OfxBankAccountFrom } from './ofx-body';

export class OfxBankAccountAdapter {
  public static convertToAccount(
    accountInfo: OfxBankAccount,
    accountFrom?: OfxBankAccountFrom
  ): AccountModel {
    let accountNumber;
    let bankId;
    let accountType;
    let serviceStatus;
    if (accountFrom) {
      accountNumber = accountFrom.ACCTID;
      bankId = accountFrom.BANKID;
      accountType = accountFrom.ACCTTYPE;
    } else {
      accountNumber = accountInfo.BANKACCTINFO.BANKACCTFROM.ACCTID;
      accountType = accountInfo.BANKACCTINFO.BANKACCTFROM.ACCTTYPE;
      bankId = accountInfo.BANKACCTINFO.BANKACCTFROM.BANKID;
      serviceStatus = accountInfo.BANKACCTINFO.SVCSTATUS;
    }
    return {
      accountId: accountNumber,
      bankId: bankId,
      ofxAccountType: accountType,
      serviceStatus: serviceStatus
    };
  }
}
