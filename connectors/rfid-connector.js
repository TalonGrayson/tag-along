const Mfrc522 = require("mfrc522-rpi");
const SoftSPI = require("rpi-softspi");
const { rfidEventListener } = require("../actions/actions-listener");

export default listenForTags = () => {
    rfidEventListener();
}