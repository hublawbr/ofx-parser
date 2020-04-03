import { AccountBalanceModel } from './account-balance.model';

export interface AccountModel {
  bankId?: string;
  brokerId?: string;
  accountId?: string;
  ofxAccountType?:
    | 'CHECKING'
    | 'SAVINGS'
    | 'MONEYMRKT'
    | 'CREDITLINE'
    | 'CD'
    | 'CREDITCARD'
    | 'INVESTMENT'
    | 'LOAN'
    | undefined;
  loanAccountType?:
    | 'AUTO'
    | 'CONSUMER'
    | 'MORTGAGE'
    | 'COMMERCIAL'
    | 'STUDENT'
    | 'MILITARY'
    | 'SMB'
    | 'CONSTR'
    | 'HOMEEQUITY'
    | undefined;
  lastUpdated?: Date;
  serverResponseDate?: Date;
  serviceStatus?: 'AVAIL' | 'PEND' | 'ACTIVE';
  ledgerBalance?: AccountBalanceModel;
  availableBalance?: AccountBalanceModel;
}
