const Astrodec = require('./astrodec');
const Astroscan = require('./astroscan');
const CmenObs = require('./cmenobs');

module.exports = class DeviceBuilder {

  astrodec(obsCon, discordCon, event_info) {
    return new Astrodec(obsCon, discordCon, event_info);
  }

  async astroscan(obsCon, discordCon, event_info) {
    return new Astroscan(obsCon, discordCon, await eventTag(event_info.id));
  }

  cmenobs(obsCon, discordCon, event_info) {
    return new CmenObs(obsCon, discordCon, event_info);
  }

}