// Use .env file for local environment variables
// const dotenv = require("dotenv");
// dotenv.config();

const OBSWebSocket = require("obs-websocket-js");
const obs = new OBSWebSocket();

obs
  .connect({
    address: process.env.OBS_WEBSOCKET_ADDRESS,
    password: process.env.OBS_WEBSOCKET_PASSWORD,
  })
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
