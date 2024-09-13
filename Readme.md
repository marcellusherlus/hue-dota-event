# Steps you want to follow

## Setup

```js
npm run i
```

Get the IP Address of your Hue Bridge, easiest way to check on it, is on the official hue app
Settings > My Hue System > Click the Button (i)

Enter the IP Address in the .env file there is a variable named BRIDGE_IP, replace the value with your ip address
e.g. BRIDGE_IP=192.168.0.1

## Script order

1. node createUser.js --> !! This will create a user for you, you need to push the Hue Brindge Sync Button before running the script !!
   1. Enter the created User Name in the .env file the same way you did for the IP Address
2. node getLightIds.js
   1. You need to set the specific Bulb ID in the script triggerLightState
3. node triggerLightState.js
