import { TransactionModel } from './transaction.model';
import { PositionModel } from './position.model';

export interface StatementModel {
  transactions?: TransactionModel[];
  positions?: PositionModel[];
  ledgerBalance?: number;
  availableBalance?: number;
  balanceAsOf?: Date;
}
