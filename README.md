# nwServersGetter (northwood servers getter)

## Warning: this script is distributed exclusively for educational purposes and is not intended to promote circumvention of official restrictions on the SCP Secret Laboratory API (api.scpslgame.com)

### This script will allow you to easily get a list of all servers without using the api with api key.

## Getting Started

### Preparing

**To use it, you need the dependencies [`jsdom`](https://github.com/jsdom/jsdom)`@^16.2.2` & [`puppeteer`](https://github.com/puppeteer/puppeteer)`@^3.0.0`.**

To install, enter `npm i jsdom puppeteer`.

Download the script [`func.js`](https://github.com/iRebbok/nwServersGetter/blob/master/src/func.js) to the folder where you are going to use it.

(The fastest way is to press the `Raw` button and `CTRL` + `S` keys to save the script file)

### Usage

The script is easy to use: [`test.js`](https://github.com/iRebbok/nwServersGetter/blob/master/src/test.js).

Example of use
```js
const func = require('./func');

func().then(servers => {
    var randomServer = JSON.parse(servers[Math.floor(Math.random() * servers.length)]);
    console.log(`ParsedInfo = ${(Buffer.from(randomServer.info, 'base64').toString('utf8').replace(tagRegex, '').replace(spacesRegex, ' ')}`);
}
```

The function is asynchronous and returns a string array for parsing into a JSON object. if you use a script to get the number of players on your server, I recommend using it `JSON.parse(servers)` and search your server by serverId.


## Dependencies:

- **jsdom**
  - [Github](https://github.com/jsdom/jsdom)
  - License: [MIT](https://github.com/jsdom/jsdom/blob/master/LICENSE.txt)
- **puppeteer**
  - [Github](https://github.com/puppeteer/puppeteer)
  - License: [Apache-2.0](https://github.com/puppeteer/puppeteer/blob/master/LICENSE)
