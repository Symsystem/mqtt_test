# Overview
Test project created to reproduce the issue described [here](https://github.com/mqttjs/MQTT.js/issues/1233) in the library MQTT.js.
The idea is to show that the variable `__webpack_require__` is a function globally available in NodeJS environment when the application is built with Webpack.

The code is simple : it opens a connection to the publicly available MQTT broker **emqx.io** using the MQTT.js client to open the connection.
It logs `CONNECTED` to the console once the connection established.

## Build and Run with the bug
```bash
npm install
npm run build
npm run start-node
```

This error should be thrown: (it actually tries to call `new WebSocket()`, being the websocket class available in browsers only).

```
webpack://mqtt_test/./node_modules/mqtt/lib/connect/ws.js?:108
  let socket = new WebSocket(url, [websocketSubProtocol])
               ^

ReferenceError: WebSocket is not defined
    at createBrowserWebSocket (webpack://mqtt_test/./node_modules/mqtt/lib/connect/ws.js?:108:16)
    at Object.browserStreamBuilder (webpack://mqtt_test/./node_modules/mqtt/lib/connect/ws.js?:135:16)
    at MqttClient.wrapper [as streamBuilder] (webpack://mqtt_test/./node_modules/mqtt/lib/connect/index.js?:154:36)
    at MqttClient._setupStream (webpack://mqtt_test/./node_modules/mqtt/lib/client.js?:298:22)
```

## Fix the issue
Then go to `node_modules/mqtt/lib/connect/ws.js` and replace the line 17 by this :
```js
const IS_BROWSER = typeof process !== 'undefined' && process.title === 'browser';
```

Rebuild and run : 

```bash
npm run build
npm run start-node
```

You should see the log `CONNECTED` in the console.

## About
Tested with NodeJS 14