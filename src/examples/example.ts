// import * as prompts from 'prompts';
import * as fs from 'fs';
import { OfxCarbonator } from '../ofx';
import { TransactionModel } from 'src/transaction.model';
import { StatementModel } from 'src/statement.model';

interface ParsedOfx {
  ledgerBalance: number,
  availableBalance?: number;
  balanceAsOf: Date;
  transactions: TransactionModel[]
  positions?: any
}

const main = async () => {
  const filePath = './samples/duplicate.ofx'

  const ofxData = await readFile(filePath);
  console.log('file read');
  const ofxCarbonator = new OfxCarbonator();


  let results: StatementModel;
  try {
    console.log('parsing statement...');
    results = await ofxCarbonator.carbonateStatement(ofxData);
    console.log('results', results);
    const creditOnly = results.transactions.filter(t => {
      return t.transactionType === 'CHECK'
    })
    // console.log('------------------')
    // console.log('creditOnly', creditOnly)
    console.log('-------------------')
    // const transactions = await removeDuplicates(results.transactions)
    console.log('Total: ', results.transactions.length)

  } catch (e) {
    console.error('error', e);
  }
};

// async function removeDuplicates(arr: Array<TransactionModel>) {

//   const setUnico = new Set(arr)
//   return [...setUnico]

// }

function readFile(filePath): Promise<string> {
  return new Promise((resolve, reject) => {
    let ofxData = '';
    const readStream = fs.createReadStream(filePath);
    readStream
      .on('data', (data: string) => {
        ofxData += data;
      })
      .on('error', e => {
        reject(e);
      })
      .on('end', () => {
        resolve(ofxData);
      });
  });
}

main();
