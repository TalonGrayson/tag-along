let DeviceBuilder = require('../devices/device-builder');
let obsCon = require("../connectors/obs-connector");
let discordCon = require("../connectors/discord-connector");
const deviceBuilder = new DeviceBuilder();

const Mfrc522 = require("mfrc522-rpi");
const SoftSPI = require("rpi-softspi");

runEvent = (obsCon, discordCon, event_info) => {
  // Build device from event data, passing in obsCon
  let device = deviceBuilder[event_info.device](obsCon, discordCon, event_info);

  // Bomb out if the device couldn't be built
  if(!device) console.log('Device not found');
  if(!device) return;
      
  // Run the requested method on the device
  device[device.event]();
}

particleEventListener = (event_data) => {

  // Parse event data
  const event_info = JSON.parse(event_data.data.replace(/'/g, '"'));

  // Run event
  runEvent(obsCon, discordCon, event_info);

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
    const foundCard = mfrc522.findCard();
    if (!foundCard.status) return;

    //# Get the UID of the card
    const uid = mfrc522.getUid();
    let eventName;
    if (uid.status) {
      switch(parsedRfidTag(uid.data)) {
        case "4:28:82:26":
          console.log("Mega Man");
          eventName = "Mega Man";
          break;
        case "4:1f:c5:56":
          console.log("Jack Sparrow");
          eventName = "Jack Sparrow";
          break;
        case "4:6b:2e:c9":
          console.log("Talon Grayson");
          eventName = "Talon Grayson";
          break;
        default:
          console.log("Unknown tag");
      }
    } else {
      console.log("UID Scan Error");
      return;
    }

    if (eventName) {
      const event_info = {device: "astroscan", name: eventName}
      
      // Run event
      runEvent(obsCon, discordCon, event_info);
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
