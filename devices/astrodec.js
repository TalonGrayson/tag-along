const Device = require('./device');

module.exports = class Astrodec extends Device {
  constructor(...args) {
    super(...args);
    this.event = this.event_info.event
  }

  button_11_pressed() {
    console.log(this.event_info);
    // console.log(this.event);
  }

  button_12_pressed(){
    console.log(this.event);
  }
  
  button_18_pressed() {
    console.log(this.event);
  }

  button_41_pressed(){
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Physical Work Cam");
  }

  button_42_pressed(){
    console.log('The answer to the ultimate question of life, the universe, and everything');
    super.transitionToCamera("Main Cams", "HeartLogo", 850, "Elgato");
  }

  
}