/**
 * This script just tests the main function and serves as a usage example.
 * 04/20/2020 iRebbok#2429
 */


const func = require('./func');
const tagRegex = /<[^>]*?>/g;
const spacesRegex = /\s+/g;

(async () => {
    const servers = await func();

    const randomServer = JSON.parse(servers[Math.floor(Math.random() * servers.length)]); // data is not in object format, it is a simple string
    console.log(`OriginalInfo = ${randomServer.info}`);
    console.log(`ParsedInfo = ${(Buffer.from(randomServer.info, 'base64').toString('utf8')).replace(tagRegex, '').replace(spacesRegex, ' ')}`);
    console.log(`Players = ${randomServer.players}`);
    console.log(`Serverid = ${randomServer.serverId}`);
    console.log(`IP = ${randomServer.ip}`);
    console.log(`Port = ${randomServer.port}`);
    console.log(`Version = ${randomServer.version}`);
    console.log(`isoCode = ${randomServer.isoCode}`);
})()