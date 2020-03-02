import {
  OfxInvestmentPositionType,
  OfxInvestmentStatementResponse
} from './index';
import { OfxDateUtil } from './ofx-date.util';
import { AccountBalanceModel } from '../account-balance.model';
import { NumUtil } from './num.util';

export class OfxInvestmentBalanceAdapter {
  public static convertToAccountBalance(
    statementResponse: OfxInvestmentStatementResponse
  ): AccountBalanceModel {
    let balance = statementResponse.INVBAL
      ? parseFloat(statementResponse.INVBAL.AVAILCASH)
      : 0;
    // if (Array.isArray(statementResponse.INVPOSLIST)) {
    //   statementResponse.INVPOSLIST.map(posType => {
    //     balance = NumUtil.addNumbers(balance, this.getPosition(posType));
    //   });
    // } else {
    balance = NumUtil.addNumbers(balance, this.getPosition(statementResponse));
    // }
    return {
      balanceAmount: balance,
      balanceAsOf: OfxDateUtil.OfxDateToDate(statementResponse.DTASOF)
    };
  }

  private static getPosition(
    statementResponse: OfxInvestmentStatementResponse
  ): number {
    if (!statementResponse.INVPOSLIST) {
      return 0;
    }
    if (statementResponse.INVPOSLIST.POSMF) {
      return this.getMarketValue(statementResponse.INVPOSLIST.POSMF);
    } else if (statementResponse.INVPOSLIST.POSOPT) {
      return this.getMarketValue(statementResponse.INVPOSLIST.POSOPT);
    } else if (statementResponse.INVPOSLIST.POSSTOCK) {
      return this.getMarketValue(statementResponse.INVPOSLIST.POSSTOCK);
    } else if (statementResponse.INVPOSLIST.POSDEBT) {
      return this.getMarketValue(statementResponse.INVPOSLIST.POSDEBT);
    } else if (statementResponse.INVPOSLIST.POSOTHER) {
      return this.getMarketValue(statementResponse.INVPOSLIST.POSOTHER);
    } else {
      throw new Error('Invalid Investment position type');
    }
  }

  private static getMarketValue(
    positionType: OfxInvestmentPositionType | Array<OfxInvestmentPositionType>
  ): number {
    if (Array.isArray(positionType)) {
      let result = 0;
      positionType.map(posType => {
        result = NumUtil.addNumbers(result, parseFloat(posType.INVPOS.MKTVAL));
      });
      return result;
    } else {
      return parseFloat(positionType.INVPOS.MKTVAL);
    }
  }
}
