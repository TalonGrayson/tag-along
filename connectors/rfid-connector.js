const { rfidScanListener } = require("../actions/actions-listener");

listenForTags = () => {
    console.log("Start listening...");
    rfidScanListener();
}

module.exports = {
    listenForTags
  };