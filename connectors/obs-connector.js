// Use .env file for local environment variables
// const dotenv = require("dotenv");
// dotenv.config();
// Package: https://github.com/obs-websocket-community-projects/obs-websocket-js
// Docs: https://github.com/obsproject/obs-websocket/blob/master/docs/generated/protocol.md

const OBSWebSocket = require('obs-websocket-js').default;
const obs = new OBSWebSocket();

obs
  .connect(
    process.env.OBS_WEBSOCKET_ADDRESS,
    process.env.OBS_WEBSOCKET_PASSWORD
  )
  .then(() => {
    console.log(`OBSCon is connected to OBS... have a great stream!`);
  })
  .catch((err) => {
    console.log(`OBSCon could not connect to OBS!`);
    // Promise convention dicates you have a catch on every chain.
    console.log({ obs_websocket_error: err });
  });

// You must add this handler to avoid uncaught exceptions.
obs.on("error", (err) => {
  console.error("Error:", err);
});

module.exports.obs = obs;
