const OBSWebSocket = jest.fn().mockImplementation(() => {
    return {
      connect: jest.fn().mockResolvedValue('Connected'),
      reidentify: jest.fn().mockResolvedValue('Reidentified'),
    };
  });
  
  module.exports = OBSWebSocket;