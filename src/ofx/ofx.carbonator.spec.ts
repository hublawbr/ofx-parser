import { OfxCarbonator } from './ofx.carbonator';

describe('OfxCarbonator', () => {
  let ofxCarbonator: OfxCarbonator;
  beforeEach(() => {
    ofxCarbonator = new OfxCarbonator();
  });

  it('should create', () => {
    expect(ofxCarbonator).toBeDefined();
  });

  it('should return false on a bad ofx string', () => {
    expect(ofxCarbonator['validOfxString']('foo')).toBeFalsy();
  });

  it('should throw error on bad statement string', async () => {
    await expect(ofxCarbonator.carbonateStatement('foo')).rejects.toEqual(
      Error('Attempting to convert an invalid string.')
    );
  });
});
