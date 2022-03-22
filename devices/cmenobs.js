const Device = require('./device');

module.exports = class CmenObs extends Device {
  constructor(...args) {
    super(...args);
    this.event = this.event_info.event
  }

  pattern_1() {
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Physical Work Cam");
  }

  pattern_2() {
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Elgato");
  }

  pattern_3() {
    super.setScene("BRB");
  }

  pattern_4() {
    super.timedSourceDisplay("Popups", "ShotDisclaimer", 5);
  }

  
}