const rewire = require('rewire');


jest.mock('../connectors/obs-connector');
const actionsListener = rewire('./actions-listener');

const { getScannedRfidTagDataByScannableId } = require('./actions-listener');

// Mock the fetch function
// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () => Promise.resolve({ name: 'Test Event' }),
//   })
// );

describe('getScannedRfidTagDataByScannableId', () => {
  const getScannedRfidTagDataByScannableId = actionsListener.__get__('getScannedRfidTagDataByScannableId');

  it('returns the event data for a valid scannable ID', async () => {
    const data = await getScannedRfidTagDataByScannableId('12345');
    expect(data).toEqual({ name: 'Test Event' });
  });
});