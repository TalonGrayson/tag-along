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
  device[device.action]();
}

rfidEventListener = () => {

  // Parse event data
  const event_info = rfidScanListener();
  if(!event_info) { console.log("No event!"); return; }
  if(!event_info.device) { console.log("No Device: %o", event_info); return; }
  if(!event_info.name) { console.log("No Name: %o", event_info); return; }

  // Run event
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

  setInterval(async function() {
    //# reset card
    mfrc522.reset();

    //# Scan for cards
    const foundCard = mfrc522.findCard();
    if (!foundCard.status) return;

    //# Get the UID of the card
    const uid = mfrc522.getUid();
    if (!uid) return;

    findRfidEvent(uid)
    .then((eventData) => {
      const event_info = { device: "astroscan", name: eventData.name, action: eventData.action };
      runEvent(obsCon, discordCon, event_info);
    })
    .catch(error => console.log({error}));

    await waitForCardRemoval();
    
  }, 500);  
}

const waitForCardRemoval = async () => {
  while (true) {
    console.log('Entering while loop');

    mfrc522.reset();
    let currentCard = mfrc522.findCard();
  
    if (!currentCard.status) {
      console.log('Card removed');
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3000ms delay
      break;
    }

    console.log('Card still present');
  
    // Optional: Introduce a delay between iterations
    await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
  }
};

const rfidEvents = {
  "4:28:82:26": "Mega Man",
  // "4:1f:c5:56": "Jack Sparrow",
  "4:6b:2e:c9": "Talon Grayson",
  // "4:34:e4:5c": "Dr Doom",
  // "4:8b:43:44": "Guy Chapman",
  // "4:26:fa:50": "Chester Hassenpfeffer",
  "4:8e:93:91": "Poogie",
  "4:33:7f:c0": "Iron Man",
};

const getScannedRfidTagDataByScannableId = async (scannable_id) => {
  const url = `${process.env.ASTRO_API_URL}/api/v1/scannable/${scannable_id}`;

  const scannable_info = await fetch(url)
    .then(response => {
      return response.json()
    })
    .catch(error => {
      console.error('Error:', error);
    });

  console.log({scannable_info});
  
  return scannable_info;
}

findRfidEvent = async (uid) => {
  console.log({uid});
  if (uid.status) {
    const scannable_id = await parsedRfidTag(uid.data);
    const scannedRfidData = await getScannedRfidTagDataByScannableId(scannable_id);
    return scannedRfidData;
  } else {
    console.log("UID Scan Error");
    return;
  }
}

parsedRfidTag = (uid) => {
  return `${uid[1].toString(16)}:${uid[2].toString(16)}:${uid[3].toString(16)}:${uid[4].toString(16)}` //:${uid[5].toString(16)}:${uid[6].toString(16)}:${uid[7].toString(16)}`
}

module.exports = {
  rfidScanListener,
};
