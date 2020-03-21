export interface AccountModel {
  bankId?: string;
  brokerId?: string;
  accountId?: string;
  accountType?: 'BANK' | 'CREDITCARD' | 'INVESTMENT';
  ofxAccountType?:
    | 'CHECKING'
    | 'SAVINGS'
    | 'MONEYMARKET'
    | 'CREDITLINE'
    | 'CD'
    | 'CREDITCARD'
    | 'INVESTMENT'
    | undefined;
  lastUpdated?: Date;
  serverResponseDate?: Date;
  serviceStatus?: 'AVAIL' | 'PEND' | 'ACTIVE';
}
