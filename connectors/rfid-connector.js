const { rfidEventListener } = require("../actions/actions-listener");

listenForTags = () => {
    console.log("Start listening...");
    rfidEventListener();
}

module.exports = {
    listenForTags
  };