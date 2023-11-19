const Particle = require("particle-api-js");
const particle = new Particle();
const token = process.env.PARTICLE_ACCESS_TOKEN;
const devicesPr = particle.listDevices({ auth: token });


const { particleEventListener } = require("../actions/actions-listener");

connectionStatus = (device) => {
  console.log(
    `${device.name} ${device.connected ? "is" : "is not"} connected.`
  );
};

devicesPr.then(
  function (devices) {
    const device_names = process.env.PARTICLE_DEVICE_NAMES.split(",");

    const found_devices = devices.body.filter((device) =>
      device_names.includes(device.name)
    );

    found_devices.forEach((found_device) => {
      connectionStatus(found_device);
    });

    particle
      .getEventStream({
        name: "scan_info",
        auth: token,
      })
      .then(function (stream) {
        stream.on("event", function (data) {
          particleEventListener(data);
        });
      });
  },
  function (err) {
    console.log("List devices call failed: ", err);
  }
);
