import { OfxDateUtil } from './ofx-date.util';
import { PositionModel } from '../position.model';
import {
  OfxInvestmentPositionType,
  OfxInvestmentStatementResponse
} from './ofx-body';

export class OfxInvestmentPositionAdapter {
  public static convertToAccountPosition(
    statementResponse: OfxInvestmentStatementResponse
  ): PositionModel[] {
    let positions = [];
    if (statementResponse.INVPOSLIST) {
      if (statementResponse.INVPOSLIST.POSMF) {
        positions = positions.concat(
          this.convertPositionType(
            statementResponse.INVPOSLIST.POSMF,
            'MUTUALFUND'
          )
        );
      }

      if (statementResponse.INVPOSLIST.POSOPT) {
        positions = positions.concat(
          this.convertPositionType(
            statementResponse.INVPOSLIST.POSOPT,
            'OPTION'
          )
        );
      }

      if (statementResponse.INVPOSLIST.POSSTOCK) {
        positions = positions.concat(
          this.convertPositionType(
            statementResponse.INVPOSLIST.POSSTOCK,
            'STOCK'
          )
        );
      }

      if (statementResponse.INVPOSLIST.POSDEBT) {
        positions = positions.concat(
          this.convertPositionType(statementResponse.INVPOSLIST.POSDEBT, 'DEBT')
        );
      }

      if (statementResponse.INVPOSLIST.POSOTHER) {
        positions = positions.concat(
          this.convertPositionType(
            statementResponse.INVPOSLIST.POSOTHER,
            'OTHER'
          )
        );
      }
    }

    if (statementResponse.INVBAL && statementResponse.INVBAL.AVAILCASH) {
      positions = positions.concat(
        this.convertAvailableCash(statementResponse)
      );
    }

    return positions;
  }

  private static convertPositionType(
    positionType: OfxInvestmentPositionType | Array<OfxInvestmentPositionType>,
    typeName: string
  ): PositionModel[] {
    if (Array.isArray(positionType)) {
      return positionType.map(posType => {
        return this.convertPositionTypeToPosition(posType, typeName);
      });
    } else {
      return [this.convertPositionTypeToPosition(positionType, typeName)];
    }
  }

  private static convertPositionTypeToPosition(
    positionType: OfxInvestmentPositionType,
    typeName: string
  ): PositionModel {
    return {
      dateOfPrice: OfxDateUtil.OfxDateToDate(positionType.INVPOS.DTPRICEASOF),
      marketValue: parseFloat(positionType.INVPOS.MKTVAL),
      memo: positionType.INVPOS.MEMO,
      positionType: typeName,
      secId: positionType.INVPOS.SECID.UNIQUEID,
      unitPrice: parseFloat(positionType.INVPOS.UNITPRICE),
      units: parseFloat(positionType.INVPOS.UNITS)
    };
  }

  private static convertAvailableCash(
    response: OfxInvestmentStatementResponse
  ): PositionModel {
    return {
      dateOfPrice: OfxDateUtil.OfxDateToDate(response.DTASOF),
      marketValue: parseFloat(response.INVBAL.AVAILCASH),
      memo: undefined,
      positionType: 'CASH',
      secId: 'CASH'
    };
  }
}
