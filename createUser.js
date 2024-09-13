const { v3 } = require('node-hue-api');
const hueApi = v3.api;

const appName = 'node-hue-api';
const deviceName = 'example-code';

// Replace this with your actual Hue Bridge IP address
const KNOWN_BRIDGE_IP = '192.168.0.77';
async function discoverAndCreateUser() {
  // Directly use the known IP address to create an unauthenticated instance of the Hue API
  const unauthenticatedApi = await hueApi.createLocal(KNOWN_BRIDGE_IP).connect();

  let createdUser;
  try {
    createdUser = await unauthenticatedApi.users.createUser(appName, deviceName);
    console.log('*******************************************************************************\n');
    console.log(
      'User has been created on the Hue Bridge. The following username can be used to\n' +
        'authenticate with the Bridge and provide full local access to the Hue Bridge.\n' +
        'YOU SHOULD TREAT THIS LIKE A PASSWORD\n'
    );
    console.log(`Hue Bridge User: ${createdUser.username}`);
    console.log(`Hue Bridge User Client Key: ${createdUser.clientkey}`);
    console.log('*******************************************************************************\n');

    // Create a new API instance authenticated with the newly created user
    const authenticatedApi = await hueApi.createLocal(KNOWN_BRIDGE_IP).connect(createdUser.username);

    // Fetch and display the bridge configuration
    const bridgeConfig = await authenticatedApi.configuration.getConfiguration();
    console.log(`Connected to Hue Bridge: ${bridgeConfig.name} :: ${bridgeConfig.ipaddress}`);
  } catch (err) {
    if (err.getHueErrorType && err.getHueErrorType() === 101) {
      console.error('The Link button on the bridge was not pressed. Please press the Link button and try again.');
    } else {
      console.error(`Unexpected Error: ${err.message}`);
    }
  }
}

// Run the function to discover and create a user
discoverAndCreateUser();
