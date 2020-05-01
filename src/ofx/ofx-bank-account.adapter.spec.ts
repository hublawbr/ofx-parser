import { OfxBankAccount } from './ofx-body';
import { OfxBankAccountAdapter } from './ofx-bank-account.adapter';

describe('OfxBankAccountAdapter', () => {
  it('should convert ofx bank account info to account models', () => {
    const accountInfo: OfxBankAccount = {
      BANKACCTINFO: {
        BANKACCTFROM: {
          ACCTID: '456',
          ACCTTYPE: 'CHECKING',
          BANKID: '123'
        },
        SVCSTATUS: 'ACTIVE',
        SUPTXDL: '',
        XFERDEST: '',
        XFERSRC: ''
      }
    };
    const model = OfxBankAccountAdapter.convertToAccount(accountInfo);
    expect(model.accountId).toBe('456');
    // expect(model.accountType).toBe('CASH');
    expect(model.ofxAccountType).toBe('CHECKING');
  });
});
