const Astrodec = require('./astrodec');
const Astroscan = require('./astroscan');
const CmenObs = require('./cmenobs');

module.exports = class DeviceBuilder {

  astrodec(obsCon, event_info) {
    return new Astrodec(obsCon, event_info);
  }

  astroscan(obsCon, event_info) {
    return new Astroscan(obsCon, event_info);
  }

  cmenobs(obsCon, event_info) {
    return new CmenObs(obsCon, event_info);
  }

}