require('dotenv').config();
const { v3 } = require('node-hue-api');
const hueApi = v3.api;

const BRIDGE_IP = process.env.BRIDGE_IP;
const USERNAME = process.env.USERNAME;

async function setLightStateForPeriod(lightId, newState, periodMs) {
  const api = await hueApi.createLocal(BRIDGE_IP).connect(USERNAME);

  try {
    // Get the current state of the light
    const originalState = await api.lights.getLightState(lightId);
    console.log('Original light state:', originalState);

    // Set the light to the new state
    await api.lights.setLightState(lightId, newState);
    console.log('Light state changed to new settings.');

    // Wait for the specified period
    await new Promise(resolve => setTimeout(resolve, periodMs));

    // Restore the original state of the light
    await api.lights.setLightState(lightId, originalState);
    console.log('Light state restored to original settings.');
  } catch (err) {
    console.error(`Error setting light state: ${err.message}`);
  }
}

module.exports = { setLightStateForPeriod };
