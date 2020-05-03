import { OfxParser } from './ofx.carbonator';

describe('OfxCarbonator', () => {
  let ofxParser: OfxParser;
  beforeEach(() => {
    ofxParser = new OfxParser();
  });

  it('should create', () => {
    expect(ofxParser).toBeDefined();
  });

  it('should return false on a bad ofx string', () => {
    expect(ofxParser['validOfxString']('foo')).toBeFalsy();
  });

  it('should throw error on bad statement string', async () => {
    await expect(ofxParser.parseStatement('foo')).rejects.toEqual(
      Error('Attempting to convert an invalid string.')
    );
  });
});
