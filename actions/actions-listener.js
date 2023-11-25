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
  if(!event_info || !event_info.device || !event_info.name) return;

  // Run event
  runEvent(obsCon, discordCon, event_info);

};

rfidEventListener = () => {

  // Parse event data
  const event_info = rfidScanListener();
  if(!event_info) console.log("No event!");
  if(!event_info) return;
  if(!event_info.device) console.log("No Device: %o", event_info);
  if(!event_info.device) return;
  if(!event_info.name) console.log("No Name: %o", event_info);
  if(!event_info.name) return;

  // Run event
  console.log("Event info: %o", event_info);
  runEvent(obsCon, discordCon, event_info);
}

rfidScanListener = () => {
  "use strict";

  //# This loop keeps checking for chips. If one is near it will get the UID and authenticate
  const softSPI = new SoftSPI({
    clock: 23, // pin number of SCLK
    mosi: 19, // pin number of MOSI
    miso: 21, // pin number of MISO
    client: 24 // pin number of CS
  });

  const mfrc522 = new Mfrc522(softSPI)//.setResetPin(22)

  console.log("Ready...");

  setInterval(function() {
    //# reset card
    mfrc522.reset();

    //# Scan for cards
    const foundCard = mfrc522.findCard();
    if (!foundCard.status) return;

    //# Get the UID of the card
    const uid = mfrc522.getUid();
    console.log("UID: %o", parsedRfidTag(uid.data));
    const eventName = findRfidEvent(uid);
    
    if (eventName) {
      const event_info = { device: "astroscan", name: eventName };
      runEvent(obsCon, discordCon, event_info);
    }
  }, 500);

}

findRfidEvent = (uid) => {
  console.log(uid);
  if (uid.status) {
    switch(parsedRfidTag(uid.data)) {
      case "4:28:82:26":
        return "Mega Man";
      case "4:1f:c5:56":
        return "Jack Sparrow";
      case "4:6b:2e:c9":
        return "Talon Grayson";
      case "4:34:e4:5c":
        return "Dr Doom";
      case "4:8b:43:44":
        return "Guy Chapman";
      case "4:26:fa:50":
        return "Chester Hassenpfeffer";
      case "4:8e:93:91":
        return "Poogie";
      default:
        return;
    }
  } else {
    console.log("UID Scan Error");
    return;
  }
}

parsedRfidTag = (uid) => {
  return `${uid[1].toString(16)}:${uid[2].toString(16)}:${uid[3].toString(16)}:${uid[4].toString(16)}` //:${uid[5].toString(16)}:${uid[6].toString(16)}:${uid[7].toString(16)}`
}

module.exports = {
  particleEventListener,
  rfidScanListener,
};
