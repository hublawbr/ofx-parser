import {
  OfxBankAccount,
  OfxCreditCardAccount,
  OfxInvestmentAccount
} from './ofx-body';
import { AccountModel } from '../account.model';
import { OfxBankAccountAdapter } from './ofx-bank-account.adapter';
import { OfxInvestmentAccountAdapter } from './ofx-investment-account.adapter';
import { OfxCreditCardAccountAdapter } from './ofx-credit-card-account.adapter';

export class OfxAccountInfoAdapter {
  public static convertToAccount(
    accountInfo:
      | OfxCreditCardAccount
      | OfxCreditCardAccount[]
      | OfxInvestmentAccount
      | OfxInvestmentAccount[]
      | OfxBankAccount
      | OfxBankAccount[]
  ): AccountModel {
    if ((<OfxCreditCardAccount>accountInfo).CCACCTINFO) {
      return OfxCreditCardAccountAdapter.convertToAccount(
        <OfxCreditCardAccount>accountInfo
      );
    } else if ((<OfxInvestmentAccount>accountInfo).INVACCTINFO) {
      return OfxInvestmentAccountAdapter.convertToAccount(
        <OfxInvestmentAccount>accountInfo
      );
    } else if ((<OfxBankAccount>accountInfo).BANKACCTINFO) {
      return OfxBankAccountAdapter.convertToAccount(
        <OfxBankAccount>accountInfo
      );
    } else {
      throw new Error(`Invalid account info [${accountInfo}]`);
    }
  }

  public static convertToAccountList(
    accountInfo:
      | OfxCreditCardAccount
      | OfxCreditCardAccount[]
      | OfxInvestmentAccount
      | OfxInvestmentAccount[]
      | OfxBankAccount
      | OfxBankAccount[]
  ) {
    const accountModels: AccountModel[] = [];
    if (Array.isArray(accountInfo)) {
      for (let i = 0; i < accountInfo.length; i++) {
        accountModels.push(
          OfxAccountInfoAdapter.convertToAccount(accountInfo[i])
        );
      }
    } else {
      accountModels.push(OfxAccountInfoAdapter.convertToAccount(accountInfo));
    }

    return accountModels;
  }
}
