const Mfrc522 = require("mfrc522-rpi");
const SoftSPI = require("rpi-softspi");
const { rfidEventListener } = require("../actions/actions-listener");

listenForTags = () => {
    rfidEventListener();
}

module.exports = {
    listenForTags
  };