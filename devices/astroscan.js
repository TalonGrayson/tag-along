const Device = require('./device');

module.exports = class Astroscan extends Device {
  constructor(...args) {
    super(...args);
    this.event = this.event_info.name.replace(/\s+/g, '')
  }

  Shot() {
    super.timedSourceDisplay("Popups", "ShotDisclaimer", 5);
  }

  DrDoom() {
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Physical Work Cam");
  }

  BobaFett() {
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Elgato - Working");
  }

  MegaMan() {
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Elgato - Gaming");
  }

  JackSparrow() {
    super.setScene("BRB");
  }

  TalonGrayson() {
    super.getStreamingStatus().then((streamingStatus) => {

      if(streamingStatus.streaming) {
        super.setScene("Ending Soon");
      } else {
        super.setScene("Starting Soon");
      }

    });
  }

  
}