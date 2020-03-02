import * as prompts from 'prompts';
import * as fs from 'fs';
import { OfxCarbonator } from '../ofx';

const main = async () => {
  const choice = await prompts({
    type: 'select',
    name: 'value',
    message: 'Carbonate accounts or a statement?',
    choices: [
      { title: 'Accounts', value: 0 },
      { title: 'Statement', value: 1 }
    ]
  });
  const filePathAnswer = await prompts({
    type: 'text',
    name: 'filePath',
    message: 'file path: ',
    validate: val =>
      val !== null && val.length > 0 ? true : 'file path is required.'
  });

  const ofxData = await readFile(filePathAnswer.filePath);
  console.log('file read');
  const ofxCarbonator = new OfxCarbonator();
  let results;
  try {
    if (choice.value) {
      console.log('carbonating statement...');
      results = await ofxCarbonator.carbonateStatement(ofxData);
    } else {
      console.log('carbonating accounts...');
      results = await ofxCarbonator.carbonateAccounts(ofxData);
    }
    console.log('results', results);
  } catch (e) {
    console.error('error', e);
  }
};

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
