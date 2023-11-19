let DeviceBuilder = require('../devices/device-builder');
let obsCon = require("../connectors/obs-connector");
let discordCon = require("../connectors/discord-connector");
const deviceBuilder = new DeviceBuilder();

const Mfrc522 = require("mfrc522-rpi");
const SoftSPI = require("rpi-softspi");

particleEventListener = (event_data) => {

  // Parse event data
  const event_info = JSON.parse(event_data.data.replace(/'/g, '"'));

  // Build device from event data, passing in obsCon
  let device = deviceBuilder[event_info.device](obsCon, discordCon, event_info);

  // Bomb out if the device couldn't be built
  if(!device) console.log('Device not found');
  if(!device) return;
      
  // Run the requested method on the device
  device[device.event]();
};

rfidScanListener = () => {
  "use strict";

  //# This loop keeps checking for chips. If one is near it will get the UID and authenticate
  const softSPI = new SoftSPI({
    clock: 23, // pin number of SCLK
    mosi: 19, // pin number of MOSI
    miso: 21, // pin number of MISO
    client: 24 // pin number of CS
  });

  const mfrc522 = new Mfrc522(softSPI).setResetPin(22)

  setInterval(function() {
    //# reset card
    mfrc522.reset();

    //# Scan for cards
    let response = mfrc522.findCard();
    if (!response.status) {
      console.log("No Card");
      return;
    }
    console.log("Card detected, CardType: " + response.bitSize);

    //# Get the UID of the card
    response = mfrc522.getUid();
    if (!response.status) {
      console.log("UID Scan Error");
      return;
    }

    //# If we have the UID, continue
    const uid = response.data;
    console.log("Card read UID: %o", parsedRfidTag(uid));

    //# Select the scanned card
    const memoryCapacity = mfrc522.selectCard(uid);
    console.log("Card Memory Capacity: " + memoryCapacity);

    //# This is the default key for authentication
    const key = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff];

    //# Authenticate on Block 8 with key and uid
    if (!mfrc522.authenticate(8, key, uid)) {
      console.log("Authentication Error");
      return;
    }

    //# Dump Block 8
    console.log("Block: 8 Data: " + mfrc522.getDataForBlock(8));

    //# Stop
    mfrc522.stopCrypto();
  }, 500);

}

parsedRfidTag = (uid) => {
  `${uid[1].toString(16)}:${uid[2].toString(16)}:${uid[3].toString(16)}:${uid[4].toString(16)}:${uid[5].toString(16)}:${uid[6].toString(16)}:${uid[7].toString(16)}:`
}

module.exports = {
  particleEventListener,
  rfidScanListener,
};
