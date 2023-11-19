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
    return this.obsCon.obs.call('GetStreamStatus').then((data) => {
      return data;
    })
    .catch((err) => {
      console.log({ Error: err });
    });
  };

  transitionToCamera(sceneName, transitionName, transitionDelay, cameraName) {
    this.obsCon.obs
    .call("SetCurrentProgramScene", {
      "sceneName": "Main"
    })
    .then(
      this.obsCon.obs
      .call("GetSceneItemId", {
        "sceneName": sceneName,
        "sourceName": transitionName,
      })
      .then( (data) => {
        this.obsCon.obs
        .call("SetSceneItemEnabled", {
          "sceneName": sceneName,
          "sceneItemId": data.sceneItemId,
          "sceneItemEnabled": true,
        })
      })
      .catch((err) => {
        console.log({ Error: err });
      })
    )
    .then(
      setTimeout(() => {
        this.obsCon.obs
        .call("GetSceneItemId", {
          "sceneName": sceneName,
          "sourceName": "Elgato - Gaming",
        })
        .then( (data) => {
          this.obsCon.obs
          .call("SetSceneItemEnabled", {
            "sceneName": sceneName,
            "sceneItemId": data.sceneItemId,
            "sceneItemEnabled": false,
          })
        })
        .catch((err) => {
          console.log({ Error: err });
        })
        .then(
          this.obsCon.obs
          .call("GetSceneItemId", {
            "sceneName": sceneName,
            "sourceName": "Elgato - Working",
          })
          .then( (data) => {
            this.obsCon.obs
            .call("SetSceneItemEnabled", {
              "sceneName": sceneName,
              "sceneItemId": data.sceneItemId,
              "sceneItemEnabled": false,
            })
          })
          .catch((err) => {
            console.log({ Error: err });
          })
        )
        .catch((err) => {
          console.log({ Error: err });
        })
        .then(
          this.obsCon.obs
          .call("GetSceneItemId", {
            "sceneName": sceneName,
            "sourceName": "Physical Work Cam",
          })
          .then( (data) => {
            this.obsCon.obs
            .call("SetSceneItemEnabled", {
              "sceneName": sceneName,
              "sceneItemId": data.sceneItemId,
              "sceneItemEnabled": false,
            })
          })
          .catch((err) => {
            console.log({ Error: err });
          })
        )
        .catch((err) => {
          console.log({ Error: err });
        })
        .then(
          setTimeout(() => {
            this.obsCon.obs
            .call("GetSceneItemId", {
              "sceneName": sceneName,
              "sourceName": cameraName,
            })
            .then( (data) => {
              this.obsCon.obs
              .call("SetSceneItemEnabled", {
                "sceneName": sceneName,
                "sceneItemId": data.sceneItemId,
                "sceneItemEnabled": true,
              })
            })
            .catch((err) => {
              console.log({ Error: err });
            });
          }, 10)
          
        )
        .catch((err) => {
          console.log({ Error: err });
        });
      }, transitionDelay)
    )
    .then(
      setTimeout(() => {
        this.obsCon.obs
        .call("GetSceneItemId", {
          "sceneName": sceneName,
          "sourceName": transitionName,
        })
        .then( (data) => {
          this.obsCon.obs
          .call("SetSceneItemEnabled", {
            "sceneName": sceneName,
            "sceneItemId": data.sceneItemId,
            "sceneItemEnabled": false,
          })
        })
        .catch((err) => {
          console.log({ Error: err });
        });
      }, 1200)
    )
    .catch((err) => {
      console.log({ Error: err });
    });
  };

  setScene(sceneName) {
    console.log('Setting Scene: ', sceneName)
    this.obsCon.obs
      .call("SetCurrentProgramScene", {sceneName: sceneName})
      .catch((err) => {
        console.log({ Error: err });
      });
  };

  timedSourceDisplay(scene, source, duration) {
    this.obsCon.obs
    .call("GetSceneItemId", {
      "sceneName": scene,
      "sourceName": source,
    })
    .then( (data) => {
      this.obsCon.obs
      .call("SetSceneItemEnabled", {
        "sceneName": scene,
        "sceneItemId": data.sceneItemId,
        "sceneItemEnabled": true,
      })
    })
    .then(
      setTimeout(() => {
        this.obsCon.obs
        .call("GetSceneItemId", {
          "sceneName": scene,
          "sourceName": source,
        })
        .then( (data) => {
          this.obsCon.obs
          .call("SetSceneItemEnabled", {
            "sceneName": scene,
            "sceneItemId": data.sceneItemId,
            "sceneItemEnabled": false,
          })
        })
      }, this.seconds(duration))
    )
    .catch((err) => {
      console.log({ Error: err });
    });
  };

  muteDiscord(mute) {
    const guild = this.discordCon.client.guilds.cache.get(process.env.DISCORD_SERVER_ID);
    if (guild.members) {
      guild.members.fetch(process.env.USER_DISCORD_ID)
      .then(member => {
        if(member.voice.channelId != null) {
          member.voice.setMute(mute)
          .catch((err) => {
            console.log({ Error: err });
          });
        }
      })
      .catch(error => console.log("Discord error: %o", error));
    } else {
      console.log("No Discord guild members found");
    }
  };

  muteSource(source, mute) {
    this.obsCon.obs.call("SetInputMute", {
      inputName: source,
      inputMuted: mute,
    })
    .catch((err) => {
      console.log({ Error: err });
    });
  }

  sourceMuted(source) {
    return this.obsCon.obs.call("GetInputMute", {
      inputName: source,
    }).then((data) => {
      return data;
    }).catch((err) => {
      console.log({ Error: err });
    });
  }

  displaySource(sceneName, sourceName, visible) {
    this.obsCon.obs
    .call("GetSceneItemId", {
      "sceneName": sceneName,
      "sourceName": sourceName,
    })
    .then( (data) => {
      this.obsCon.obs
      .call("SetSceneItemEnabled", {
        "sceneName": sceneName,
        "sceneItemId": data.sceneItemId,
        "sceneItemEnabled": visible,
      })
    })
    .catch((err) => {
      console.log("Gottem")
      console.log({ Error: err });
    })
  }

  brb() {
    this.setScene("BRB");
    this.muteDiscord(true);
  }

  dnd() {
    this.transitionToCamera("Main Cams", "HeartLogo", 850, "Elgato - Working");
    this.displaySource("Main", "Discord - Voice Widget", false);
    this.displaySource("Main", "Discord - DnD VC Widget", true);
    this.displaySource("Main", "Facecam", false);
    this.muteDiscord(false);
    this.muteSource("NEEWER Mic", false);
    this.muteSource("Main Channel", false);
    this.muteSource("Chillhop VLC Playlist", true);
    this.muteSource("Spotify", true);
    this.muteSource("D&D Spotify", false);
    this.muteSource("Elgato", true);
  }

  killswitch() {
    this.obsCon.obs
    .call("StopStream")
    .catch((err) => {
      console.log({ Error: err });
    });
  }

  restart() {
    // setTimeout(function () {
      // Listen for the 'exit' event.
      // This is emitted when our app exits.
      process.on("exit", function () {
        //  Resolve the `child_process` module, and `spawn`
        //  a new process.
        //  The `child_process` module lets us
        //  access OS functionalities by running any bash command.`.
        require("child_process")
          .spawn(
            process.argv.shift(),
            process.argv,
            {
              cwd: process.cwd(),
              detached: true,
              stdio: "inherit"
            }
          );
        });
        process.exit();
    // }, 1000);
  }
}