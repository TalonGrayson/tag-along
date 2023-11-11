const Device = require('./device');

module.exports = class Astroscan extends Device {
  constructor(...args) {
    super(...args);
    this.event = this.event_info.name.replace(/\s+/g, '');
  }

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

  Poogie() { // Mute/Unmute
    super.sourceMuted("NEEWER Mic")
    .then((data) => {
      super.muteDiscord(!data.inputMuted);
      super.muteSource("NEEWER Mic", !data.inputMuted);
      console.log(data.inputMuted ? "No longer muted" : "-- YOU ARE MUTED --");
    });
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

  MegaMan() { // Gaming Mode
    console.log("MegaMan");
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Elgato - Gaming");
    super.displaySource("Main", "Discord - Voice Widget", true);
    super.displaySource("Main", "Discord - DnD VC Widget", false);
    super.displaySource("Main", "Facecam", false);
    super.muteDiscord(false);
    super.muteSource("NEEWER Mic", false);
    super.muteSource("Main Channel", false);
    super.muteSource("Chillhop VLC Playlist", true);
    super.muteSource("Spotify", false);
    super.muteSource("D&D Spotify", false);
    super.muteSource("Elgato", false);
  }

  Shot() { // Shot
    console.log("Shot");
    super.timedSourceDisplay("Popups", "ShotDisclaimer", 5);
  }

  TalonGrayson() { // Stream Starting/Ending
    console.log('TalonGrayson');
    super.getStreamingStatus().then((streamingStatus) => {
      if (streamingStatus.streaming) {
        super.setScene("Ending Soon");
        super.muteSource("NEEWER Mic", true);
        super.muteSource("Main Channel", true);
        super.muteSource("Chillhop VLC Playlist", false);
        super.muteSource("Spotify", false);
        super.muteSource("D&D Spotify", false);
      } else {
        super.restart();
        super.setScene("Starting Soon");
        super.muteSource("NEEWER Mic", true);
        super.muteSource("Main Channel", true);
        super.muteDiscord(true);
      }

    })
      .catch((err) => {
        console.log({ Error: err });
      }
      )
  }
}
