const { rfidEventListener } = require("../actions/actions-listener");

listenForTags = () => {
    rfidEventListener();
}

module.exports = {
    listenForTags
  };