// Mock database module
const mockQuery = jest.fn();
const mockGetClient = jest.fn();

module.exports = {
  query: mockQuery,
  getClient: mockGetClient,
  __mocks__: {
    query: mockQuery,
    getClient: mockGetClient,
  },
};
