require('dotenv').config();
const { v3 } = require('node-hue-api');
const hueApi = v3.api;

const BRIDGE_IP = process.env.BRIDGE_IP;
const USERNAME = process.env.USERNAME;

async function setLightStateForPeriod(ids, newState, periodMs) {
  const api = await hueApi.createLocal(BRIDGE_IP).connect(USERNAME);

  try {
    const originalStates = await Promise.all(
      ids.map(async (lightId) => {
        const originalState = await api.lights.getLightState(lightId);
        console.log(`Original state of light ${lightId}:`, originalState);
        return { lightId, originalState };
      })
    );

    // Set all lights to the new state simultaneously
    await Promise.all(
      ids.map(async (lightId) => {
        await api.lights.setLightState(lightId, newState);
        console.log(`Light ${lightId} state changed to new settings.`);
      })
    );

    // Wait for the specified period
    await new Promise((resolve) => setTimeout(resolve, periodMs));

    // Restore all lights to their original states simultaneously
    await Promise.all(
      originalStates.map(async ({ lightId, originalState }) => {
        await api.lights.setLightState(lightId, originalState);
        console.log(`Light ${lightId} state restored to original settings.`);
      })
    );
  } catch (err) {
    console.error(`Error setting light state: ${err.message}`);
  }
}

module.exports = { setLightStateForPeriod };
