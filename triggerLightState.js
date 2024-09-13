const { setLightStateForPeriod } = require('./setLightState');

// This is an example on how to controll your light in a timebased manner.
// In your case you want to set the LIGHT_ID, NEW_STATE and WAIT_TIME_MS dynamically based on the Dota Event(ulti, kill, whatever).

const LIGHT_ID =  14; // !! TODO Replace with your light ID !!
const NEW_STATE = {
  on: true,           // Turn the light on
  brightness: 254,    // Set brightness (0-254)
  hue: 10000,         // Set hue for color (0-65535)
  sat: 200,           // Set saturation (0-254)
};
const WAIT_TIME_MS = 10000; // Time to wait (in milliseconds), e.g., 10000ms = 10 seconds

// This will actually call the script whichs handles the timebased light state
setLightStateForPeriod([12,14], NEW_STATE, WAIT_TIME_MS);
