let DeviceBuilder = require('../devices/device-builder');
let obsCon = require("../connectors/obs-connector");
let discordCon = require("../connectors/discord-connector");
const deviceBuilder = new DeviceBuilder();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

particleEventListener = async (event_data) => {

  // Parse event data
  const event_info = JSON.parse(event_data.data.replace(/'/g, '"'));

  // Build device from event data, passing in obsCon
  let device = await deviceBuilder[event_info.device](obsCon, discordCon, event_info);

  // Bomb out if the device couldn't be built
  if(!device) console.log('Device not found');
  if(!device) return;
      
  // Run the requested method on the device
  device[device.event]();
};

eventTag = async (tagId) => {
  return await prisma.tags.findUnique({
    where: {
      tagHex: tagId,
    }
  });
}

module.exports = {
  particleEventListener,
};
