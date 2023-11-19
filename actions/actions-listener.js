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
    if (!response.status) return;

    //# Get the UID of the card
    response = mfrc522.getUid();
    if (response.status) {
      const rfidUid = parsedRfidTag(response.data);
    } else {
      console.log("UID Scan Error");
      return;
    }

    switch(rfidUid) {
      case "4:28:82:26":
        console.log("Mega Man");
      case "4:1f:c5:56":
        console.log("Jack Sparrow");
      case "4:6b:2e:c9":
        console.log("Talon Grayson");
      default:
        console.log("Unknown tag");
    }
  }, 500);

}

parsedRfidTag = (uid) => {
  return `${uid[1].toString(16)}:${uid[2].toString(16)}:${uid[3].toString(16)}:${uid[4].toString(16)}` //:${uid[5].toString(16)}:${uid[6].toString(16)}:${uid[7].toString(16)}`
}

module.exports = {
  particleEventListener,
  rfidScanListener,
};
