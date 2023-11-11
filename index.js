/*
    Tag-Along by TalonGrayson

    This is a node app designed to be run while streaming to capture inputs from various devices
    and convert them into various actions in software.

    Primarily built with OBS control in mind, it has enough extensibility to affect other targets
    such as Discord, etc.

    Can probably be run on a Raspberry Pi Zero W
*/

if (process.env.NODE_ENV != "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

require("./connectors/particle-connector");
// require("./connectors/discord-connector");
