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
    super.muteDiscord(false);
  }

  BobaFett() {
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Elgato - Working");
    super.muteDiscord(false);
  }

  MegaMan() {
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Elgato - Gaming");
    super.muteDiscord(false);
  }

  JackSparrow() {
    super.brb();
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