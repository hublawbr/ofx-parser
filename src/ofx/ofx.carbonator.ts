import { OfxBody } from './ofx-body';
import { AccountBalanceModel } from '../account-balance.model';
import { OfxAccountBalanceAdapter } from './ofx-account-balance.carbonator';
import { PositionModel } from '../position.model';
import { TransactionModel } from '../transaction.model';
import { OfxStatementTransactionAdapter } from './ofx-statement-transaction.adapter';
import { OfxInvestmentTransactionAdapter } from './ofx-investment-transaction.adapter';
import { StatementModel } from './statement.model';
import { OfxInvestmentBalanceAdapter } from './ofx-investment-balance.adapter';
import { OfxInvestmentPositionAdapter } from './ofx-investment-position.adapter';
import * as Xml2JsParser from 'xml2js';
import { AccountModel } from '../account.model';
import { OfxAccountInfoAdapter } from './ofx-account-info.adapter';

export class OfxCarbonator {
  async carbonateAccounts(xml: string): Promise<AccountModel[]> {
    const body = await this.convertFromXML(xml);
    console.log('body', JSON.stringify(body));
    return OfxAccountInfoAdapter.convertToAccountList(
      body.OFX.SIGNUPMSGSRSV1.ACCTINFOTRNRS.ACCTINFORS.ACCTINFO
    );
  }

  async carbonateStatement(xml: string): Promise<StatementModel> {
    const body = await this.convertFromXML(xml);
    let ledgerBalance: AccountBalanceModel;
    let availableBalance: AccountBalanceModel;
    let transactions: TransactionModel[];
    let positions: PositionModel[];
    if (body.OFX.BANKMSGSRSV1) {
      ledgerBalance = OfxAccountBalanceAdapter.convertToAccountBalance(
        body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL
      );
      if (body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.AVAILBAL) {
        availableBalance = OfxAccountBalanceAdapter.convertToAccountBalance(
          body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.AVAILBAL
        );
      }
      transactions = OfxStatementTransactionAdapter.convertTransactionList(
        body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN
      );
    } else if (body.OFX.CREDITCARDMSGSRSV1) {
      ledgerBalance = OfxAccountBalanceAdapter.convertToAccountBalance(
        body.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.LEDGERBAL
      );
      if (body.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.AVAILBAL) {
        availableBalance = OfxAccountBalanceAdapter.convertToAccountBalance(
          body.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.AVAILBAL
        );
      }
      transactions = OfxStatementTransactionAdapter.convertTransactionList(
        body.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN
      );
    } else if (body.OFX.INVSTMTMSGSRSV1) {
      ledgerBalance = OfxInvestmentBalanceAdapter.convertToAccountBalance(
        body.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS
      );
      if (body.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS) {
        availableBalance = OfxInvestmentBalanceAdapter.convertToAccountBalance(
          body.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS
        );
      }
      transactions = OfxInvestmentTransactionAdapter.convertTransactionList(
        body.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS.INVTRANLIST
      );

      positions = OfxInvestmentPositionAdapter.convertToAccountPosition(
        body.OFX.INVSTMTMSGSRSV1.INVSTMTTRNRS.INVSTMTRS
      );
    } else {
      console.error('Unknown message', body.OFX);
      throw new Error('Unknown message received from bank');
    }

    return {
      ledgerBalance: ledgerBalance.balanceAmount,
      availableBalance: availableBalance
        ? availableBalance.balanceAmount
        : undefined,
      balanceAsOf: ledgerBalance.balanceAsOf,
      transactions: transactions,
      positions: positions
    };
  }

  private convertFromXML(ofxString: string): Promise<OfxBody> {
    return new Promise((resolve, reject) => {
      const ofxResult = ofxString.split('<OFX>', 2);
      const ofxPart = `<OFX>${ofxResult[1]}`;

      // TODO: Check headers?
      // const headerPart = ofxResult[0].split(/\r|\n/);

      const xml = ofxPart
        // Replace ampersand
        .replace(/&/g, `&#038;`)
        .replace(/&amp;/g, `&#038;`)
        // Remove empty spaces and line breaks between tags
        .replace(/>\s+</g, '><')
        // Remove empty spaces and line breaks before tags content
        .replace(/\s+</g, '<')
        // Remove empty spaces and line breaks after tags content
        .replace(/>\s+/g, '>')
        // Remove dots in start-tags names and remove end-tags with dots
        .replace(
          /<([A-Z0-9_]*)+\.+([A-Z0-9_]*)>([^<]+)(<\/\1\.\2>)?/g,
          '<$1$2>$3'
        )
        // Add a new end-tags for the ofx elements
        .replace(/<(\w+?)>([^<]+)/g, '<$1>$2</<added>$1>')
        // Remove duplicate end-tags
        .replace(/<\/<added>(\w+?)>(<\/\1>)?/g, '</$1>');

      console.debug('string to parse', xml);
      let json;
      const parser = new Xml2JsParser.Parser({ explicitArray: false });
      parser.parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        }
        json = result;
        resolve(json);
      });
    });
  }
}
