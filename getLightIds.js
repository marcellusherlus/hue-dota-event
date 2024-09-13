
require('dotenv').config();
const { v3 } = require('node-hue-api');
const hueApi = v3.api;

const BRIDGE_IP = process.env.BRIDGE_IP;
const USERNAME = process.env.USERNAME

async function main() {
  const api = await hueApi.createLocal(BRIDGE_IP).connect(USERNAME);
  const allLights = await api.lights.getAll();
  console.log('Available lights:', allLights.map(light => `${light.id}: ${light.name}`));
}

main();