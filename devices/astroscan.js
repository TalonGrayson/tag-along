const Device = require('./device');

module.exports = class Astroscan extends Device {
  constructor(...args) {
    super(...args);
    this.event = this.event_info.name.replace(/\s+/g, '');
  }

  TalonGrayson() { // Stream Starting/Ending
    console.log('TalonGrayson');
    super.getStreamingStatus().then((streamingStatus) => {
      if (streamingStatus.streaming) {
        super.setScene("Ending Soon").catch(console.error);
      } else {
        super.setScene("Starting Soon").catch(console.error);
      }

    })
      .catch((err) => {
        console.log({ Error: err });
      }
      )
  }

  IronMan() {
    console.log("IronMan");
    super.setScene("BRB").catch(console.error);
  }

  MegaMan() { // Gaming Mode
    console.log("MegaMan");
    super.setScene("Main").catch(console.error);
  }

  Poogie() { // Show/Hide Facecam
    console.log("Poogie");
    super.displaySource("FaceCam", "FaceCam C920", false);
  }

  // Currently unused:

  GuyChapman() { // Digital Mode
    console.log("GuyChapman");
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Elgato - Working");
    super.displaySource("Main", "Discord - Voice Widget", true);
    super.displaySource("Main", "Discord - DnD VC Widget", false);
    super.displaySource("Main", "Facecam", true);
    super.muteDiscord(false);
    super.muteSource("NEEWER Mic", false);
    super.muteSource("Main Channel", false);
    super.muteSource("Chillhop VLC Playlist", false);
    super.muteSource("Spotify", false);
    super.muteSource("D&D Spotify", true);
    super.muteSource("Elgato", true);
  }

  ChesterHassenpfeffer() { // D&D Mode
    console.log("ChesterHassenpfeffer");
    super.dnd();
  }

  DrDoom() { // Physical Mode
    console.log("DrDoom");
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Physical Work Cam");
    super.displaySource("Main", "Discord - Voice Widget", true);
    super.displaySource("Main", "Discord - DnD VC Widget", false);
    super.displaySource("Main", "Facecam", true);
    super.muteDiscord(false);
    super.muteSource("NEEWER Mic", false);
    super.muteSource("Main Channel", false);
    super.muteSource("Chillhop VLC Playlist", false);
    super.muteSource("Spotify", false);
    super.muteSource("D&D Spotify", true);
    super.muteSource("Elgato", true);
  }

  BobaFett() { // D&D Mode
    super.dnd();
  }

  Malzeno() { // Show Scoutfly.info
    super.timedSourceDisplay("Main", "Scoutfly", 90);
  }

  HulkTerrain() {
    super.muteDiscord(true);
    super.muteSource("NEEWER Mic", true);
  }

  JackSparrow() { // BRB
    console.log("JackSparrow");
    super.brb();
    super.muteSource("NEEWER Mic", true);
    super.muteSource("Main Channel", false);
  }

  Shot() { // Shot
    console.log("Shot");
    super.timedSourceDisplay("Popups", "ShotDisclaimer", 5);
  }


}
