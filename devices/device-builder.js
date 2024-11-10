const Astroscan = require('./astroscan');

module.exports = class DeviceBuilder {

  astroscan(obsCon, discordCon, event_info) {
    return new Astroscan(obsCon, discordCon, event_info);
  }

}