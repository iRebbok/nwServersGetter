# nwServersGetter (northwood servers getter)

## Warning: this script is distributed exclusively for educational purposes and is not intended to promote circumvention of official restrictions on the SCP Secret Laboratory API (api.scpslgame.com)

### This script will allow you to easily get a list of all servers without using the api with api key.
### Now we parse kigen.co :smug:

## Getting Started

### Preparing

**To use it, you need the dependencies [`jsdom`](https://github.com/jsdom/jsdom)`@^16.2.2` & [`cloudscraper`](https://github.com/codemanki/cloudscraper)`@^4.6.0`.**

To install, enter `npm i jsdom cloudscraper request` (`request` used by `cloudscraper`, however, I don't fit it into my dependencies, cloudscraper depends on it).

Download the script [`func.js`](https://github.com/iRebbok/nwServersGetter/blob/master/src/func.js) to the folder where you are going to use it.

(The fastest way is to press the `Raw` button and `CTRL` + `S` keys to save the script file)

### Usage

The script is easy to use: [`test.js`](https://github.com/iRebbok/nwServersGetter/blob/master/src/test.js).

Example of use
```js
const func = require('./func');
func().then(servers => {
    var randomServer = servers[Math.floor(Math.random() * servers.length)];
    console.log(`Info = ${randomServer.info}`);
}
```
This function returns a promise and can be used both asynchronously and synchronously via callback.
The promise contains `RowServer[]` structure of the object that:
```js
/**
 * @typedef {Object} RowServer
 *
 * @property {string} [ip]
 * @property {string} [port]
 * @property {string} [info]
 * @property {string} [pastebin]
 * @property {string} [players]
 * @property {string} [version]
 * @property {string} [distance]
 */
```
You won't be able to get serverId and other useful things this time, but you can still get server information, its ip, port, pastebin, and the number of playersю


## Dependencies:

- **jsdom**
  - [Github](https://github.com/jsdom/jsdom)
  - License: [MIT](https://github.com/jsdom/jsdom/blob/master/LICENSE.txt)
- **cloudscraper**
  - [Github](https://github.com/codemanki/cloudscraper)
  - License: [MIT](https://github.com/codemanki/cloudscraper/blob/master/LICENSE)
