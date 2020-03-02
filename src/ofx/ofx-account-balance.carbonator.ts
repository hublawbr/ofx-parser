import { OfxDateUtil } from './ofx-date.util';
import { OfxBalance } from './ofx-body';
import { AccountBalanceModel } from '../account-balance.model';

export class OfxAccountBalanceAdapter {
  public static convertToAccountBalance(
    balance: OfxBalance
  ): AccountBalanceModel {
    return {
      balanceAmount: parseFloat(balance.BALAMT),
      balanceAsOf: OfxDateUtil.OfxDateToDate(balance.DTASOF)
    };
  }
}
