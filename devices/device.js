// Parent method for all devices, to keep things as generic as possible

module.exports = class Device {
  constructor(obsCon, discordCon, event_info) {
    this.obsCon = obsCon;
    this.discordCon = discordCon;
    this.event_info = event_info;
  }

  // These functions are all generic; any device can call them

  seconds(seconds) {
    return seconds * 1000;
  };

  getStreamingStatus() {
    return this.obsCon.obs.send('GetStreamingStatus').then((data) => {
      return data;
    });
  };

  transitionToCamera(sceneName, transitionName, transitionDelay, cameraName) {
    this.obsCon.obs
      .send("SetCurrentScene", {
        "scene-name": "Main",
      })
      .then(
        this.obsCon.obs.send("SetMute", {
          source: "Band Hero Mic",
          mute: false,
        }).catch("Error ln17")
      )
      .then(
        this.obsCon.obs.send("SetMute", {
          source: "Main Channel",
          mute: false,
        }).catch("Error ln23")
      )
      .then(
        this.obsCon.obs.send("SetMute", {
          source: "Elgato",
          mute: false,
        }).catch("Error ln29")
      )
      .catch("Error ln31")
    .then(
      this.obsCon.obs
      .send("SetSceneItemProperties", {
        "scene-name": sceneName,
        item: transitionName,
        visible: true,
      })
    )
    .then(
      setTimeout(() => {
        this.obsCon.obs
        .send("SetSceneItemProperties", {
          "scene-name": sceneName,
          item: "Elgato - Gaming",
          visible: false,
        }).catch("Error ln60")
        .then(
          this.obsCon.obs
          .send("SetSceneItemProperties", {
            "scene-name": sceneName,
            item: "Elgato - Working",
            visible: false,
          }).catch("Error ln67")
        )
        .then(
          this.obsCon.obs
          .send("SetSceneItemProperties", {
            "scene-name": sceneName,
            item: "Physical Work Cam",
            visible: false,
          }).catch("Error ln76")
        )
        .then(
          setTimeout(() => {
            this.obsCon.obs
            .send("SetSceneItemProperties", {
            "scene-name": sceneName,
            item: cameraName,
            visible: true,
          }).catch("Error ln76")
          }, 10)
          
        )
      }, transitionDelay)
    )
    .then(
      setTimeout(() => {
        this.obsCon.obs
        .send("SetSceneItemProperties", {
          "scene-name": sceneName,
          item: transitionName,
          visible: false,
        }).catch("Error ln89")
      }, 1200)
    )
    .catch("Error because OBS not there?");
  };

  setScene(sceneName) {
    this.obsCon.obs
      .send("SetCurrentScene", {
        "scene-name": sceneName,
      }).catch("Error ln99");
  };

  timedSourceDisplay(scene, source, duration) {
    this.obsCon.obs.send("SetSceneItemProperties", {
      "scene-name": scene,
      item: source,
      visible: true,
    }).then(
      setTimeout(() => {
        this.obsCon.obs.send("SetSceneItemProperties", {
          "scene-name": scene,
          item: source,
          visible: false,
        })
      }, this.seconds(duration))
    );
  };

  muteDiscord(mute) {
    const guild = this.discordCon.client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
    guild.members.fetch(process.env.USER_DISCORD_ID)
    .then(member => {
      if(member.voice.channelId != null) {
      	member.voice.setMute(mute);
      }
    });
  };

  brb() {
    this.setScene("BRB");
    this.muteDiscord(true);
  }

}